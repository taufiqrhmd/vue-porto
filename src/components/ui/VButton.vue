<template>
  <button
    :class="[
      'cyber-btn group relative inline-flex items-center justify-center font-sciFi tracking-widest transition-all duration-350',
      'focus:outline-none focus:ring-1 focus:ring-cyan-500/30',
      sizeClasses,
      colorClasses,
      { 'opacity-75 cursor-not-allowed': disabled || loading },
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span class="relative z-10 flex items-center">
      <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0-6.627 5.373-12 12-12v4c-4.418 0-8 3.582-8 8h4z"></path>
      </svg>

      <font-awesome-icon
        v-else-if="icon"
        :icon="icon"
        :class="[
          'mr-2 transition-transform duration-300 group-hover:scale-110',
          iconSizeClass
        ]"
      />

      <slot />
    </span>

    <!-- ✨ Layer efek khusus -->
    <div class="absolute inset-0 rounded-[6px] pointer-events-none" aria-hidden="true">
      <div class="absolute inset-0 rounded-[6px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: 'outline',
    validator: (v) => ['galaxy', 'outline'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  icon: [String, Array, Object],
  loading: Boolean,
  disabled: Boolean
})

const emit = defineEmits(['click'])

const sizeClasses = computed(() => ({
  sm: 'px-4 py-1.5 text-xs uppercase',
  md: 'px-6 py-2.5 text-sm uppercase',
  lg: 'px-8 py-3 text-base uppercase'
})[props.size])

const iconSizeClass = computed(() => ({
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5'
})[props.size])

const colorClasses = computed(() => {
  const base = 'font-orbitron rounded-[6px] border'

  if (props.color === 'outline') {
    return `${base} border-white/20 text-white/90 bg-transparent
      hover:border-cyan-400/60 hover:text-cyan-300
      shadow-[0_2px_8px_rgba(0,0,0,0.2)]
      hover:shadow-[0_4px_16px_rgba(6,182,212,0.25)]
      backdrop-blur-sm transition-all duration-500`
  }

  if (props.color === 'galaxy') {
    return `${base} border-galaxy-blue/50 text-galaxy-text bg-galaxy-card
      hover:border-galaxy-cyan hover:text-white
      shadow-[0_0_12px_rgba(42,77,142,0.3)]
      hover:shadow-[0_0_20px_rgba(79,195,247,0.4)]
      galaxy-variant` // class untuk CSS custom
  }

  return base
})
</script>

<style scoped>
.cyber-btn {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

/* 🔷 Garis Laser Scanning Umum */
.cyber-btn::after {
  content: '';
  position: absolute;
  top: -100%; /* Mulai dari atas tombol */
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, transparent, currentColor, transparent);
  filter: blur(1px);
  opacity: 0;
  z-index: 20;
  pointer-events: none;
}

/* Aktifkan scanning saat hover */
.cyber-btn:hover::after {
  animation: btnScan 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  opacity: 0.8;
}

/* Animasi Scan Vertikal */
@keyframes btnScan {
  0% { top: -10%; }
  100% { top: 110%; }
}

/* 🌌 Penyesuaian khusus varian Galaxy */
.cyber-btn.galaxy-variant {
  background: linear-gradient(135deg, #141a2e 0%, #2a4d8e 50%, #141a2e 100%);
  background-size: 200% 200%;
  animation: galaxyMove 4s ease infinite;
}

/* Noise halus (CRT Effect) */
.cyber-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.03) 0px,
    rgba(255, 255, 255, 0.03) 1px,
    transparent 1px,
    transparent 2px
  );
  z-index: 5;
  pointer-events: none;
}

@keyframes galaxyMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>