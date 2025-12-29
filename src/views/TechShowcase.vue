<template>
  <section class="py-16 px-4">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
      <div class="md:w-1/2 space-y-4 pl-6">
        <h2 class="text-3xl md:text-4xl font-bold text-galaxy-blue">
          {{ displayContent.title }}
        </h2>
        <p class="text-lg text-galaxy-text-muted leading-relaxed">
          {{ displayContent.description }}
        </p>
      </div>

      <div class="md:w-1/2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-5 place-items-center">
        <button v-for="tech in technologies" :key="tech.id" type="button"
          class="flex flex-col items-center group bg-transparent border-0 p-0 cursor-pointer outline-none"
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
import { ref, onMounted, onUnmounted } from 'vue';
import { supabase } from '@/lib/supabase';

const intro = {
  title: 'Teknologi yang Saya Kuasai',
  description: 'Berikut stack teknologi yang saya kuasai — dari frontend, backend, hingga mobile.',
};

const technologies = ref([]);
const hoveredTechId = ref(null);
const displayContent = ref(intro);
const isLoading = ref(true);
let leaveTimer = null;

async function fetchTechnologies() {
  try {
    const { data, error } = await supabase
      .from('technologies')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    technologies.value = data;
  } catch (err) {
    console.error('Error fetching data:', err.message);
  } finally {
    isLoading.value = false;
  }
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

onUnmounted(() => clearTimeout(leaveTimer));
</script>

<style scoped>
button:focus {
  outline: none;
}
</style>