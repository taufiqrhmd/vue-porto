<script setup>
import { ref } from 'vue';
import { gsap } from 'gsap';

const props = defineProps({
  text: { type: String, required: true },
  sizeClass: { type: String, default: 'text-[15vw] md:text-[12vw]' }
});

const mainTitle = ref(null);
const filledTitle = ref(null);
const interactiveArea = ref(null);

const handleMouseMove = (e) => {
  if (!filledTitle.value) return;
  const rect = interactiveArea.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  gsap.to(filledTitle.value, {
    clipPath: `circle(120px at ${x}px ${y}px)`,
    duration: 0.2,
    ease: "none",
    overwrite: "auto"
  });
};

const handleMouseLeave = (e) => {
  if (!filledTitle.value) return;
  const rect = interactiveArea.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  gsap.to(filledTitle.value, {
    clipPath: `circle(0px at ${x}px ${y}px)`,
    duration: 0.4,
    ease: "power2.in",
    overwrite: "auto"
  });
};

// Expose refs agar bisa dianimasikan dari parent (HeroSection) saat intro
defineExpose({ mainTitle, filledTitle });
</script>

<template>
  <div 
    ref="interactiveArea"
    class="relative overflow-visible pb-6 md:pb-10 cursor-default"
    @mousemove="handleMouseMove" 
    @mouseleave="handleMouseLeave"
  >
    <div class="relative inline-block">
      <h1 
        ref="mainTitle"
        :class="[sizeClass, 'font-black uppercase leading-[0.9] text-transparent pointer-events-none stroke-text']"
      >
        {{ text }}
      </h1>

      <h1 
        ref="filledTitle"
        :class="[sizeClass, 'filled-text absolute top-0 left-0 w-full font-black uppercase leading-[0.9] pointer-events-none']"
      >
        {{ text }}
      </h1>
    </div>
  </div>
</template>

<style scoped>
.stroke-text {
  -webkit-text-stroke: 2px rgba(255, 255, 255, 0.4);
}

.filled-text {
  background: linear-gradient(135deg, #00f7ff, #8a2be2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: blur(0.5px) drop-shadow(0 0 8px rgba(0, 247, 255, 0.6));
  clip-path: circle(0% at 50% 50%);
  will-change: clip-path;
}

h1 {
  font-family: 'Arial Black', sans-serif;
  white-space: nowrap;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
}
</style>