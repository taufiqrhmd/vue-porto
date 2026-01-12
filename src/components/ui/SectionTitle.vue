<script setup>
import { computed } from 'vue';

const props = defineProps({
  text: { type: String, required: true },
  center: { type: Boolean, default: false },
  // Prop size untuk fleksibilitas ukuran di berbagai section
  size: { 
    type: String, 
    default: 'lg',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  }
});

// Mapping ukuran ke class Tailwind
const sizeClasses = computed(() => {
  const mapping = {
    'sm': 'text-xl md:text-2xl lg:text-3xl',
    'md': 'text-4xl md:text-5xl lg:text-6xl',
    'lg': 'text-4xl md:text-6xl lg:text-7xl',
    'xl': 'text-5xl md:text-7xl lg:text-9xl'
  };
  return mapping[props.size];
});
</script>

<template>
  <h1 
    :class="[
      'font-title italic bg-gradient-to-r from-glow-start via-glow-mid to-glow-end bg-clip-text text-transparent tracking-tighter leading-none py-2',
      sizeClasses,
      center ? 'text-center' : 'text-left'
    ]"
  >
    {{ text }}
  </h1>
</template>

<style scoped>
.font-title {
  /* Memberikan efek glow tipis sesuai tema galaxy */
  filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.4));
}
</style>