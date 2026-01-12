<script setup>
defineProps({
  label: String,
  value: String,
  iconColor: { type: String, default: 'text-galaxy-cyan' },
  borderColor: { type: String, default: 'group-hover:border-galaxy-cyan' }
});
</script>

<template>
  <div class="flex items-start space-x-4 group">
    <div :class="['p-3.5 bg-gray-900/60 rounded-xl border border-gray-800 transition-colors', borderColor]">
      <div :class="iconColor">
        <slot name="icon"></slot>
      </div>
    </div>
    <div>
      <p class="font-mono text-xs uppercase tracking-widest text-galaxy-text-muted">{{ label }}</p>
      <p class="font-sans text-lg font-medium text-white">{{ value }}</p>
    </div>
  </div>
</template>