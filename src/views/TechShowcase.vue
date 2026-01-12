<template>
  <section ref="showcaseContainer" class="px-4 opacity-0 overflow-hidden relative py-20">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10">
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

      <div class="font-sciFi w-full md:w-1/2 flex flex-wrap justify-center gap-4 md:gap-10 place-items-center">
        <TechCard v-for="tech in technologies" :key="tech.id" :tech="tech" :is-hovered="hoveredTechId === tech.id"
          @hover="onHover" @leave="onLeave" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { supabase } from '@/lib/supabase';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TechCard from '@/components/ui/TechCard.vue';

gsap.registerPlugin(ScrollTrigger);

const intro = {
  title: 'Digital Toolkit',
  description: 'Carefully chosen tools that balance power, elegance, and clarity—where clean code meets creative expression.',
};

const technologies = ref([]);
const hoveredTechId = ref(null);
const displayContent = ref(intro);
let leaveTimer = null;

const showcaseContainer = ref(null);
const textContent = ref(null);
const textCol = ref(null);

async function fetchTechnologies() {
  try {
    const { data } = await supabase.from('technologies').select('*').order('id', { ascending: true });
    if (data) technologies.value = data;
    await nextTick();
    initAnimation();
  } catch (err) {
    console.error('Error fetching data:', err.message);
  }
}

function initAnimation() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: showcaseContainer.value,
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });

  tl.to(showcaseContainer.value, { opacity: 1, duration: 0.5 })
    .from(textCol.value, { x: -50, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
    .to(".tech-card", {
      opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08,
      ease: "back.out(1.7)",
      startAt: { y: 30, scale: 0.8 }
    }, "-=0.5");
}

function updateTextAnim(newContent) {
  gsap.to(textContent.value, {
    opacity: 0, y: -10, duration: 0.2, ease: "power2.in",
    onComplete: () => {
      displayContent.value = newContent;
      gsap.fromTo(textContent.value,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  });
}

function onHover(tech) {
  clearTimeout(leaveTimer);
  if (hoveredTechId.value === tech.id) return;
  hoveredTechId.value = tech.id;
  updateTextAnim(tech);
}

function onLeave() {
  leaveTimer = setTimeout(() => {
    hoveredTechId.value = null;
    updateTextAnim(intro);
  }, 200);
}

onMounted(fetchTechnologies);
onUnmounted(() => {
  clearTimeout(leaveTimer);
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>