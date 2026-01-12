<template>
  <Topbar />
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <ConstellationCanvas />
      <div class="bg-galaxy-darker w-full">
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

        <ProfileSection />
        <TechShowcase />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </div>
    </div>
  </div>

  <BackToTop />
</template>

<script setup>
import Topbar from '@/layout/Topbar.vue'
import HeroSection from './views/HeroSection.vue'
import ProfileSection from '@/views/ProfileSection.vue'
import TechShowcase from '@/views/TechShowcase.vue'
import ProjectsSection from '@/views/ProjectsSection.vue'
import ExperienceSection from '@/views/ExperienceSection.vue'
import ContactSection from '@/views/ContactSection.vue'
import ConstellationCanvas from '@/components/ui/ConstellationCanvas.vue'
import BackToTop from '@/components/ui/BackToTop.vue'

import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger, ScrollSmoother, ScrollToPlugin } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin)

let smoother = null
const showBackToTop = ref(false)

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 700
}

onMounted(() => {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

  nextTick(() => {
    smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 2,
      effects: true,
      normalizeScroll: true,
    })
    
    window.addEventListener('scroll', handleScroll)
  })
})

onUnmounted(() => {
  smoother?.kill()
  ScrollTrigger.killAll()
  window.removeEventListener('scroll', handleScroll)
})
</script>