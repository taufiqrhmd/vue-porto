<template>
  <Topbar />
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <div class="bg-galaxy-darker min-h-screen">
        <!-- Hero Section -->
        <div class="relative w-full h-screen flex items-center justify-center overflow-hidden">
          <div class="absolute inset-0 z-0" :style="{
            background: 'linear-gradient(135deg, #0a0a15, #1e0a3c)',
            maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
          }"></div>
          <HeroSection />
          <div
            class="absolute bottom-2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 animate-fade-in-up opacity-0 pb-4"
            style="animation-delay: 1s">
            <span class="scroll-text text-[10px] font-sciFi uppercase tracking-[0.3em] text-white/70">
              SCROLL_TO_EXPLORE
            </span>
          </div>
        </div>

        <!-- Parallax Star Background Container -->
        <div ref="parallaxContainer" class="relative overflow-hidden">
          <!-- Layer Bintang Parallax -->
          <div ref="starLayer" class="fixed inset-0 pointer-events-none z-[1]"></div>

          <!-- Konten Utama -->
          <ProfileSection />
          <TechShowcase />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </div>
      </div>
    </div>
  </div>

  <!-- Back to Top Button -->
  <Transition name="cyber-fade">
    <button v-if="showBackToTop" @click="scrollToTop"
      class="fixed bottom-10 right-10 z-50 group flex h-14 w-14 items-center justify-center">
      <div class="absolute inset-0 rounded-full border border-glow-start/30 bg-glow-start/5 animate-pulse"></div>
      <div
        class="absolute inset-0 rounded-full border-2 border-transparent border-t-glow-start/60 border-l-glow-start/60 animate-spin-slow">
      </div>
      <div
        class="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-galaxy-darker/90 backdrop-blur-xl transition-all duration-300 group-hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          class="w-5 h-5 text-white transition-transform duration-300 group-hover:-translate-y-1">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7" />
        </svg>
        <div class="absolute bottom-2 w-4 h-[1px] bg-glow-start opacity-0 group-hover:opacity-100 transition-opacity">
        </div>
      </div>
      <span
        class="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-[10px] font-sciFi tracking-[0.2em] text-galaxy-text whitespace-nowrap bg-galaxy-darker/40 px-2 py-1 backdrop-blur-sm border-r-2 border-glow-start">
        RETURN_TO_BASE
      </span>
    </button>
  </Transition>
</template>

<script setup>
import Topbar from '@/layout/Topbar.vue'
import HeroSection from './views/HeroSection.vue'
import ProfileSection from '@/views/ProfileSection.vue'
import TechShowcase from '@/views/TechShowcase.vue'
import ProjectsSection from '@/views/ProjectsSection.vue'
import ExperienceSection from '@/views/ExperienceSection.vue'
import ContactSection from '@/views/ContactSection.vue'

import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger, ScrollSmoother, ScrollToPlugin } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin)

let smoother = null
const isScrollReady = ref(false)
const showBackToTop = ref(false)
const starLayer = ref(null)
const parallaxContainer = ref(null)

// === Scroll Handling ===
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 700
}

const scrollToTop = () => {
  gsap.to(window, {
    duration: 1,
    scrollTo: { y: 0 },
    ease: 'power2.inOut',
    onComplete: () => {
      history.pushState(null, null, '/')
    }
  })
}

// === Buat Bintang Dinamis ===
const createStars = (count = 150) => {
  const container = starLayer.value
  if (!container) return

  container.innerHTML = ''
  container.style.background = 'transparent'

  for (let i = 0; i < count; i++) {
    const star = document.createElement('div')
    const size = Math.random() * 3 + 1 // 1–4px
    const posX = Math.random() * 100
    const posY = Math.random() * 100
    const opacity = Math.random() * 0.7 + 0.3
    const twinkleDuration = 2 + Math.random() * 4 // 2–6s

    star.style.cssText = `
      position: absolute;
      left: ${posX}%;
      top: ${posY}%;
      width: ${size}px;
      height: ${size}px;
      background: white;
      border-radius: 50%;
      opacity: ${opacity};
      animation: twinkle ${twinkleDuration}s infinite alternate;
      z-index: -1;
    `
    container.appendChild(star)
  }
}

// === Animasi Parallax Bintang ===
const initParallaxStars = () => {
  if (!starLayer.value || !parallaxContainer.value) return

  // Pastikan ScrollTrigger tahu konteks smoother
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: parallaxContainer.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      invalidateOnRefresh: true,
      // Penting: karena pakai ScrollSmoother, jangan gunakan window scroll
    }
  })

  // Gerakkan bintang ke arah berlawanan (parallax)
  tl.to(starLayer.value, {
    y: '20%',
    ease: 'none'
  })
}

onMounted(() => {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  if (window.location.pathname !== '/') window.history.replaceState(null, '', '/')

  const waitForReady = () => {
    const fontsLoaded = document.fonts ? document.fonts.ready : Promise.resolve()
    return Promise.all([fontsLoaded])
  }

  waitForReady().then(() => {
    smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 2,
      effects: true,
      smoothTouch: 0.1,
      normalizeScroll: true,
      ignoreMobileResize: true,
    })
    smoother.scrollTop(0)

    setTimeout(() => {
      ScrollTrigger.refresh()
      isScrollReady.value = true

      // Setelah smoother siap, buat bintang & parallax
      createStars(200)
      initParallaxStars()
    }, 300)
  })

  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  smoother?.kill()
  ScrollTrigger.killAll()
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Tambahkan animasi twinkle untuk bintang */
@keyframes twinkle {
  0% {
    opacity: 0.3;
  }

  100% {
    opacity: 1;
  }
}

.scroll-text {
  animation: pulseText 3s ease-in-out infinite;
}

@keyframes pulseText {

  0%,
  100% {
    opacity: 0.4;
    text-shadow: 0 0 0px rgba(var(--glow-start-rgb), 0);
  }

  50% {
    opacity: 1;
    text-shadow: 0 0 8px rgba(var(--glow-start-rgb), 0.6);
  }
}

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
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>