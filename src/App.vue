<template>
  <Topbar />
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <div class="bg-galaxy-darker min-h-screen">
        <div class="fixed inset-0 pointer-events-none z-0" ref="starfield"></div>
        <div class="relative w-full h-screen flex items-center justify-center overflow-hidden">
          <div class="absolute inset-0 z-0" :style="{
            background: 'linear-gradient(135deg, #0a0a15, #1e0a3c)',
            maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
          }">
          </div>
          <HeroSection />
          <div
            class="absolute bottom-2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 animate-fade-in-up opacity-0 pb-4"
            style="animation-delay: 1s">
            <span class="scroll-text text-[10px] font-sciFi uppercase tracking-[0.3em] text-white/70">
              SCROLL_TO_EXPLORE
            </span>
          </div>
        </div>
        <ProfileSection />
        <TechShowcase />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </div>
    </div>
  </div>
  <Transition name="cyber-fade">
    <button v-if="showBackToTop" @click="scrollToTop"
      class="fixed bottom-10 right-10 z-50 group flex h-14 w-14 items-center justify-center">
      <div class="absolute inset-0 rounded-full border border-glow-start/30 bg-glow-start/5 animate-pulse"></div>

      <div
        class="absolute inset-0 rounded-full border-2 border-transparent border-t-glow-start/60 border-l-glow-start/60 animate-spin-slow">
      </div>

      <div
        class="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-galaxy-darker/90 backdrop-blur-xl transition-all duration-300 group-hover:scale-110 group-hover:border-glow-start group-active:scale-95">

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
import bgImage from '/images/bg-milkyway.jpg'
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

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 700
}

const scrollToTop = () => {
  gsap.to(window, {
    duration: 1,
    scrollTo: { y: 0 },
    ease: 'power2.inOut',
    onComplete: () => {
      history.pushState(null, null, '/');
    }
  });
};


onMounted(() => {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

  if (window.location.pathname !== '/') {
    window.history.replaceState(null, '', '/');
  }

  const waitForReady = () => {
    const fontsLoaded = document.fonts ? document.fonts.ready : Promise.resolve()
    const bgImg = new Image()
    bgImg.src = bgImage
    const imageLoaded = new Promise((resolve) => {
      if (bgImg.complete) resolve()
      else { bgImg.onload = resolve; bgImg.onerror = resolve; }
    })
    return Promise.all([fontsLoaded, imageLoaded])
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
    smoother.scrollTop(0);

    setTimeout(() => {
      ScrollTrigger.refresh()
      isScrollReady.value = true
    }, 200)
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

/* Animasi Rotasi Halus untuk Border Orbit */
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
