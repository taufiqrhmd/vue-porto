<template>
  <button
    :class="[
      // Base styles
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-galaxy-bg',
      // Ukuran
      sizeClasses,
      // Warna dinamis
      colorClasses,
      // Disabled/loading
      { 'opacity-75 cursor-not-allowed': disabled || loading },
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="mr-2 animate-spin">⏳</span>
    <span v-else-if="icon" class="mr-2">{{ icon }}</span>
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    default: 'primary',
    validator: (value) =>
      ['primary', 'secondary', 'success', 'danger', 'galaxy', 'outline', 'ghost'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  icon: String,
  loading: Boolean,
  disabled: Boolean,
})

const emit = defineEmits(['click'])

// Ukuran
const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}[props.size]

// 🌌 Warna — disesuaikan dengan tema galaxy-mu & Tailwind custom colors
const colorClasses = {
  // ✅ Galaxy: tombol utama — gradient biru galaksi + teks cyan
  galaxy: [
    'bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700',
    'text-galaxy-text font-semibold shadow-lg',
    'hover:from-blue-600 hover:via-indigo-500 hover:to-purple-600',
    'hover:shadow-xl',
    'focus:ring-galaxy-glow/50',
  ].join(' '),

  // ✅ Primary: fallback solid — tetap pakai biru Tailwind yang cerah
  primary: [
    'bg-galaxy-accent text-galaxy-bg font-semibold',
    'hover:bg-blue-500',
    'focus:ring-galaxy-accent/50',
  ].join(' '),

  // ✅ Secondary: abu-abu space-friendly
  secondary: [
    'bg-gray-700 text-gray-200',
    'hover:bg-gray-600',
    'focus:ring-gray-500/50',
  ].join(' '),

  // ✅ Success: hijau lembut (untuk CTA positif)
  success: [
    'bg-emerald-600 text-white',
    'hover:bg-emerald-500',
    'focus:ring-emerald-500/50',
  ].join(' '),

  // ✅ Danger: merah gelap (tidak terlalu 'alarm')
  danger: [
    'bg-rose-700 text-white',
    'hover:bg-rose-600',
    'focus:ring-rose-500/50',
  ].join(' '),

  // ✅ Outline: untuk GitHub/LinkedIn — border + text galaxy
  outline: [
    'border-2 text-galaxy-text',
    'border-galaxy-accent/70',
    'bg-transparent',
    'hover:bg-galaxy-accent/10',
    'focus:ring-galaxy-accent/40',
  ].join(' '),

  // ✅ Ghost: hanya teks + hover background halus (untuk aksi sekunder)
  ghost: [
    'text-galaxy-text bg-transparent',
    'hover:bg-galaxy-bg/20',
    'focus:ring-galaxy-glow/30',
  ].join(' '),
}[props.color]
</script>