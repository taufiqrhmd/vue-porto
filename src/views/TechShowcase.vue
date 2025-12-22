<template>
  <section class="py-16 px-4">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
      <!-- Kiri: Judul & Penjelasan -->
      <div class="md:w-1/2 space-y-4 pl-6">
        <h2 class="text-3xl md:text-4xl font-bold text-galaxy-blue">
          {{ displayContent.title }}
        </h2>
        <p class="text-lg text-galaxy-text-muted leading-relaxed">
          {{ displayContent.description }}
        </p>
      </div>

      <!-- Kanan: Icon Grid — HANYA ICON -->
      <div class="md:w-1/2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-5 place-items-center">
        <button
          v-for="tech in technologies"
          :key="tech.id"
          type="button"
          class="flex flex-col items-center group bg-transparent border-0 p-0 cursor-pointer outline-none"
          @mouseenter="onHover(tech)"
          @mouseleave="onLeave"
        >
          <!-- ✅ Hanya icon, tanpa container -->
          <img
            :src="tech.icon"
            :alt="tech.name"
            class="w-12 h-12 object-contain transition-all duration-300 ease-out"
            :class="{
              // Idle: abu-abu, sedikit kecil, flat
              'grayscale opacity-50 scale-100': hoveredTechId !== tech.id,
              // Hover: full color, sedikit lebih besar & naik sedikit
              'grayscale-0 opacity-100 scale-110 -translate-y-1': hoveredTechId === tech.id,
            }"
            style="
              backface-visibility: hidden;
              transform-style: preserve-3d;
              will-change: transform, filter;
            "
          />
          <span
            class="mt-3 text-sm font-medium transition-colors duration-300"
            :class="{
              'text-galaxy-text-muted': hoveredTechId !== tech.id,
              'text-galaxy-blue': hoveredTechId === tech.id,
            }"
          >
            {{ tech.name }}
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';

const intro = {
  title: 'Teknologi yang Saya Kuasai',
  description: 'Berikut stack teknologi yang saya kuasai — dari frontend, backend, hingga mobile.',
};

const technologies = [
  {
    id: 'vue',
    name: 'Vue.js',
    title: 'Vue.js — Progressive Framework',
    description: 'Framework utama saya untuk membangun antarmuka web interaktif dan reactive.',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  },
{
  id: 'laravel',
  name: 'Laravel',
  title: 'Laravel — Elegant PHP Framework',
  description: 'Framework PHP modern yang andal untuk membangun backend RESTful API dan aplikasi web skala enterprise.',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
},
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    title: 'Tailwind CSS — Utility-First',
    description: 'Styling cepat, konsisten, dan tanpa meninggalkan HTML — andalan dalam semua proyek.',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  },
  {
    id: 'php',
    name: 'PHP',
    title: 'PHP + Laravel',
    description: 'Backend logic, API internal, dan integrasi database untuk aplikasi web dinamis.',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  },
  {
    id: 'flutter',
    name: 'Flutter',
    title: 'Flutter — Cross-Platform Mobile',
    description: 'Untuk aplikasi mobile performa tinggi dengan UI konsisten di Android & iOS.',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
  },
];

const hoveredTechId = ref(null);
const displayContent = ref(intro);
let leaveTimer = null;

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

onUnmounted(() => clearTimeout(leaveTimer));
</script>

<style scoped>
/* Opsional: hindari accidental focus outline (untuk UX bersih) */
button:focus {
  outline: none;
}
</style>