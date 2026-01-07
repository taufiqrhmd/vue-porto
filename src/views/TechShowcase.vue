<template>
  <section ref="showcaseContainer" class="px-4 opacity-0 overflow-hidden">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10 pb-12 pt-4">

      <div ref="textCol" class="w-full md:w-1/2 space-y-4 text-center md:text-left md:pl-6 min-h-[160px] md:h-12">
        <div ref="textContent" class="space-y-4">
          <h2
            class="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-glow-start to-glow-mid">
            {{ displayContent.title }}
          </h2>
          <p class="text-base md:text-lg text-galaxy-text-muted leading-relaxed">
            {{ displayContent.description }}
          </p>
        </div>
      </div>

      <div class="w-full md:w-1/2 flex flex-wrap justify-center gap-4 md:gap-12 place-items-center">
        <button v-for="tech in technologies" :key="tech.id" type="button" class="tech-card flex flex-col items-center group bg-transparent border-0 p-0 cursor-pointer outline-none opacity-0 
           w-[20%] min-w-[70px] md:w-auto" @mouseenter="onHover(tech)" @mouseleave="onLeave"
          @touchstart="onHover(tech)">

          <div class="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
            <img :src="tech.icon" :alt="tech.name"
              class="w-full h-full object-contain transition-all duration-300 ease-out" :class="{
                'grayscale opacity-50 scale-100': hoveredTechId !== tech.id,
                'grayscale-0 opacity-100 scale-110 -translate-y-1': hoveredTechId === tech.id,
              }" />
          </div>

          <span class="mt-2 md:mt-3 text-[10px] md:text-sm font-medium transition-colors duration-300 whitespace-nowrap"
            :class="{
              'text-galaxy-text-muted': hoveredTechId !== tech.id,
              'text-galaxy-magenta': hoveredTechId === tech.id,
            }">
            {{ tech.name }}
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { supabase } from '@/lib/supabase';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const intro = {
  title: 'Digital Toolkit',
  description: 'Carefully chosen tools that balance power, elegance, and clarity—where clean code meets creative expression.',
};

const technologies = ref([]);
const hoveredTechId = ref(null);
const displayContent = ref(intro);
const isLoading = ref(true);
let leaveTimer = null;

// Refs untuk animasi
const showcaseContainer = ref(null);
const textCol = ref(null);
const textContent = ref(null);

async function fetchTechnologies() {
  try {
    const { data, error } = await supabase
      .from('technologies')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    technologies.value = data;

    // Tunggu DOM selesai render setelah data masuk, baru jalankan animasi
    await nextTick();
    initAnimation();
  } catch (err) {
    console.error('Error fetching data:', err.message);
  } finally {
    isLoading.value = false;
  }
}

function initAnimation() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: showcaseContainer.value,
      start: "top 85%", // Mulai sedikit sebelum section terlihat penuh
      toggleActions: "play none none none"
    }
  });

  // 1. Munculkan container utama
  tl.to(showcaseContainer.value, { opacity: 1, duration: 0.5 })

    // 2. Animasi teks dari kiri
    .from(textCol.value, {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.3")

    // 3. Animasi stagger ikon (muncul satu per satu)
    .to(".tech-card", {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      stagger: 0.1, // Jeda antar item 0.1 detik
      ease: "back.out(1.7)",
      startAt: { y: 30, scale: 0.8 } // Keadaan awal sebelum animasi
    }, "-=0.5");
}

onMounted(() => {
  fetchTechnologies();
});

function updateTextAnim(newContent) {
  gsap.to(textContent.value, {
    opacity: 0,
    y: -10,
    duration: 0.2,
    ease: "power2.in",
    onComplete: () => {
      // Ganti konten setelah teks lama menghilang
      displayContent.value = newContent;

      // Animasi teks baru muncul
      gsap.fromTo(textContent.value,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  });
}

function onHover(tech) {
  clearTimeout(leaveTimer);
  if (hoveredTechId.value === tech.id) return; // Hindari trigger jika sudah aktif

  hoveredTechId.value = tech.id;
  updateTextAnim(tech); // Gunakan animasi
}

function onLeave() {
  leaveTimer = setTimeout(() => {
    hoveredTechId.value = null;
    updateTextAnim(intro); // Kembali ke intro dengan animasi
  }, 200);
}

onUnmounted(() => {
  clearTimeout(leaveTimer);
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<style scoped>
button:focus {
  outline: none;
}

/* Memastikan elemen tech-card tersembunyi sebelum GSAP berjalan */
.tech-card {
  opacity: 0;
  will-change: transform, opacity;
}
</style>