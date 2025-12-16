<!-- src/components/UI/Button.vue -->
<template>
  <button
    :class="[
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-galaxy-bg',
      sizeClasses,
      colorClasses,
      { 'opacity-75 cursor-not-allowed': disabled || loading },
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0-6.627 5.373-12 12-12v4c-4.418 0-8 3.582-8 8h4z"></path>
    </svg>

    <font-awesome-icon
      v-else-if="icon"
      :icon="icon"
      :class="[
        'mr-2',
        {
          'h-4 w-4': size === 'sm',
          'h-5 w-5': size === 'md',
          'h-6 w-6': size === 'lg',
        }
      ]"
    />

    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'success', 'danger', 'galaxy', 'outline', 'ghost'].includes(v)
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

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
}[props.size]

const colorClasses = {
  galaxy: 'bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 text-galaxy-text font-semibold shadow-lg hover:from-blue-600 hover:via-indigo-500 hover:to-purple-600 hover:shadow-xl focus:ring-galaxy-glow/50',
  outline: 'border-2 border-galaxy-accent/70 text-galaxy-text bg-transparent hover:bg-gradient-to-r hover:from-galaxy-purple hover:to-nebula-soft focus:ring-galaxy-accent/40',
//   ghost: 'text-galaxy-text bg-transparent hover:bg-galaxy-bg/20 focus:ring-galaxy-glow/30',
//   success: 'bg-emerald-600 text-white hover:bg-emerald-500 focus:ring-emerald-500/50',
//   danger: 'bg-rose-700 text-white hover:bg-rose-600 focus:ring-rose-500/50',
}[props.color]
</script>