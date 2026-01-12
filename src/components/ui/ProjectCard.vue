<script setup>
import Button from '@/components/ui/VButton.vue';

defineProps({
  project: Object
});

defineEmits(['view-detail']);
</script>

<template>
  <div class="project-card shrink-0 w-[85vw] md:w-[70vw] lg:w-[55vw] h-[60vh] md:h-[70vh] relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900 opacity-0 translate-y-20">
    <img :src="project.image_url" :alt="project.title" class="w-full h-full object-cover" loading="lazy" />

    <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col items-center justify-end pb-8 md:pb-12 px-6 text-white md:opacity-0 md:hover:opacity-100 transition-opacity duration-500 text-center">
      <h3 class="text-xl md:text-3xl font-bold mb-2">{{ project.title }}</h3>
      <p class="text-xs md:text-sm mb-5 text-gray-300 max-w-md line-clamp-3 md:line-clamp-none">
        {{ project.subtitle }}
      </p>

      <Button color="galaxy" size="sm" @click="$emit('view-detail', project)"
        class="px-5 py-2 md:px-6 md:py-2 text-black rounded-full font-bold">
        View Details
      </Button>
    </div>
  </div>
</template>

<style scoped>
.project-card {
  will-change: transform, opacity;
}
</style>