<template>
  <section ref="showcaseContainer" class="py-16 px-4 opacity-0">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
      
      <div ref="textCol" class="md:w-1/2 space-y-4 pl-6">
        <h2 class="text-3xl md:text-4xl font-bold text-galaxy-blue">
          {{ displayContent.title }}
        </h2>
        <p class="text-lg text-galaxy-text-muted leading-relaxed">
          {{ displayContent.description }}
        </p>
      </div>

      <div class="md:w-1/2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-5 place-items-center">
        <button v-for="tech in technologies" :key="tech.id" type="button"
          class="tech-card flex flex-col items-center group bg-transparent border-0 p-0 cursor-pointer outline-none opacity-0"
          @mouseenter="onHover(tech)" @mouseleave="onLeave">
          <img :src="tech.icon" :alt="tech.name" class="w-12 h-12 object-contain transition-all duration-300 ease-out"
            :class="{
              'grayscale opacity-50 scale-100': hoveredTechId !== tech.id,
              'grayscale-0 opacity-100 scale-110 -translate-y-1': hoveredTechId === tech.id,
            }" style="
              backface-visibility: hidden;
              transform-style: preserve-3d;
              will-change: transform, filter;
            " />
          <span class="mt-3 text-sm font-medium transition-colors duration-300" :class="{
            'text-galaxy-text-muted': hoveredTechId !== tech.id,
            'text-galaxy-blue': hoveredTechId === tech.id,
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
  title: 'Teknologi yang Saya Kuasai',
  description: 'Berikut stack teknologi yang saya kuasai — dari frontend, backend, hingga mobile.',
};

const technologies = ref([]);
const hoveredTechId = ref(null);
const displayContent = ref(intro);
const isLoading = ref(true);
let leaveTimer = null;

// Refs untuk animasi
const showcaseContainer = ref(null);
const textCol = ref(null);

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

function onHover(tech) {
  clearTimeout(leaveTimer);
  hoveredTechId.value = tech.id;
  displayContent.value = tech;
}

function onLeave() {
  leaveTimer = setTimeout(() => {
    hoveredTechId.value = null;
    displayContent.value = intro;
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