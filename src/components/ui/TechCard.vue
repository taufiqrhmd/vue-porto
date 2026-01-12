<script setup>
defineProps({
  tech: Object,
  isHovered: Boolean
});

defineEmits(['hover', 'leave']);
</script>

<template>
  <button 
    type="button" 
    class="tech-card flex flex-col items-center group bg-transparent border-0 p-0 cursor-pointer outline-none w-[20%] min-w-[70px] md:w-auto"
    @mouseenter="$emit('hover', tech)" 
    @mouseleave="$emit('leave')"
    @touchstart="$emit('hover', tech)"
  >
    <div class="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
      <img 
        :src="tech.icon" 
        :alt="tech.name"
        class="w-full h-full object-contain transition-all duration-300 ease-out" 
        :class="{
          'grayscale opacity-50 scale-100': !isHovered,
          'grayscale-0 opacity-100 scale-110 -translate-y-1': isHovered,
        }" 
      />
    </div>

    <span 
      class="mt-2 md:mt-3 text-[10px] md:text-sm font-medium transition-colors duration-300 whitespace-nowrap uppercase tracking-wider"
      :class="{
        'text-white/40': !isHovered,
        'text-galaxy-magenta': isHovered,
      }"
    >
      {{ tech.name }}
    </span>
  </button>
</template>

<style scoped>
.tech-card {
  opacity: 0; /* Akan dihandle GSAP stagger */
  will-change: transform, opacity;
}
button:focus { outline: none; }
</style>