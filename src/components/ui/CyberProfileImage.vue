<script setup>
defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: 'Profile Picture' }
});
</script>

<template>
  <div class="flex-shrink-0 mt-1 relative group" aria-hidden="true">
    <div class="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-galaxy-cyan z-20 transition-all duration-500 group-hover:shadow-[0_0_15px_#4fc3f7] group-hover:-top-3 group-hover:-left-3"></div>
    <div class="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-galaxy-magenta z-20 transition-all duration-500 group-hover:shadow-[0_0_15px_#c77dff] group-hover:-bottom-3 group-hover:-right-3"></div>

    <div class="relative overflow-hidden rounded-sm border border-white/10 bg-galaxy-darker">
      <div class="absolute inset-0 bg-scanlines opacity-20 pointer-events-none z-10"></div>
      <img :src="src" :alt="alt"
        class="w-80 h-[370px] rounded-sm object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105" />
      
      <div class="absolute inset-0 bg-gradient-to-tr from-galaxy-cyan/30 via-transparent to-galaxy-magenta/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
    </div>
  </div>
</template>

<style scoped>
.bg-scanlines {
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
  background-size: 100% 4px, 3px 100%;
}
</style>