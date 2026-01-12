<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const showButton = ref(false)

const handleScroll = () => {
  showButton.value = window.scrollY > 700
}

const scrollToTop = () => {
  gsap.to(window, {
    duration: 1,
    scrollTo: { y: 0 },
    ease: 'power2.inOut',
    onComplete: () => {
      // Membersihkan hash di URL jika diperlukan
      history.pushState(null, null, '/')
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Transition name="cyber-fade">
    <button 
      v-if="showButton" 
      @click="scrollToTop"
      class="fixed bottom-10 right-10 z-50 group flex h-14 w-14 items-center justify-center"
    >
      <div class="absolute inset-0 rounded-full border border-blue-500/30 bg-blue-500/5 animate-pulse"></div>
      <div class="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-400/60 border-l-blue-400/60 animate-spin-slow"></div>
      
      <div class="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/90 backdrop-blur-xl transition-all duration-300 group-hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          class="w-5 h-5 text-white transition-transform duration-300 group-hover:-translate-y-1">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7" />
        </svg>
      </div>

      <span class="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-[10px] font-mono tracking-[0.2em] text-white whitespace-nowrap bg-black/40 px-2 py-1 backdrop-blur-sm border-r-2 border-blue-500">
        RETURN_TO_BASE
      </span>
    </button>
  </Transition>
</template>

<style scoped>
.cyber-fade-enter-active,
.cyber-fade-leave-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.cyber-fade-enter-from,
.cyber-fade-leave-to {
  opacity: 0;
  transform: scale(0.5) rotate(180deg);
  filter: blur(10px);
}

.animate-spin-slow {
  animation: spin 4s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>