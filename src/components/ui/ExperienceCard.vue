<script setup>
defineProps({
  exp: { type: Object, required: true },
  isReversed: { type: Boolean, default: false }
});
</script>

<template>
  <div 
    class="experience-card w-full md:w-[45%] p-6 rounded-2xl border bg-gray-800/40 backdrop-blur-sm card-hover z-20"
    :class="[
      exp.type === 'current' ? 'border-blue-500/50 ring-1 ring-blue-500/30' : 'border-gray-700',
      isReversed ? 'md:ml-auto md:mr-2' : 'md:mr-auto md:ml-2'
    ]"
  >
    <div class="flex items-start gap-4">
      <span class="px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider" :class="{
        'bg-blue-500/20 text-blue-300 border border-blue-500/30': exp.type === 'bootcamp',
        'bg-purple-500/20 text-purple-300 border border-purple-500/30': exp.type === 'internship',
        'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 animate-pulse': exp.type === 'current',
      }">
        {{ exp.type }}
      </span>

      <div class="flex-1 text-left">
        <h3 class="text-xl font-bold text-white">{{ exp.title }}</h3>
        <p class="text-blue-400 font-medium">{{ exp.company }}</p>
        <p class="text-gray-400 text-sm mt-1">{{ exp.location }}</p>
      </div>
    </div>

    <p class="mt-4 text-gray-300 leading-relaxed text-sm md:text-base text-left">
      {{ exp.description }}
    </p>

    <div class="mt-4 flex flex-wrap gap-2">
      <span v-for="tech in exp.tech" :key="tech"
        class="px-3 py-1 bg-gray-700/50 rounded-lg text-xs text-gray-300 border border-gray-600">
        {{ tech }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.experience-card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
}
.experience-card:hover {
  transform: translateY(-8px);
  background-color: rgba(31, 41, 55, 0.7);
  border-color: rgba(59, 130, 246, 0.4);
}
</style>