<script setup>
defineProps({
  text: { type: String, required: true }
});
</script>

<template>
  <h1 class="text-4xl md:text-6xl lg:text-7xl font-title italic bg-gradient-to-r from-glow-start via-glow-mid to-glow-end bg-clip-text text-transparent tracking-tighter leading-none">
    {{ text }}
  </h1>
</template>

<style scoped>
.font-title {
  filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.4));
}
</style>