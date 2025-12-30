<template>
  <Topbar />
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <div class="bg-galaxy-darker">
        <div class="relative w-full h-screen flex items-center justify-center"
          :style="{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }">
          <div class="absolute inset-0 bg-galaxy-darker/80"></div>
          <HeroSection/>
        </div>

        <div id="profil" class="relative -mt-10 mb-10 mx-5 md:mx-24 rounded-xl p-6 pb-14">
          <ProfileSection />
        </div>

        <TechShowcase />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />

      </div>
    </div>
  </div>
</template>

<script setup>
import bgImage from '@/assets/images/bg-milkyway.jpg'
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

onMounted(() => {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  
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

    setTimeout(() => {
      ScrollTrigger.refresh()
      isScrollReady.value = true
    }, 200)
  })
})

onUnmounted(() => {
  smoother?.kill()
  ScrollTrigger.killAll()
})
</script>
