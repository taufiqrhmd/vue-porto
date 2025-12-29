<template>
  <Topbar />
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <div class="bg-galaxy-darker">
        <div class="relative w-full h-screen flex items-center justify-center"
          :style="{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }">
          <div class="absolute inset-0 bg-galaxy-darker/80"></div>

          <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 py-10 px-6 md:px-12 lg:px-18 xl:px-24 w-full">
            <div class="text-left max-w-2xl">
              <h1 class="text-3xl font-heading tracking-wide font-extrabold md:text-5xl bg-clip-text text-galaxy-text">
                Hello, <span class="bg-clip-text text-transparent bg-gradient-to-r from-glow-end to-glow-start">it's
                  me</span>
              </h1>
              <h4 class="mt-1 text-3xl md:text-6xl font-heading font-extrabold bg-clip-text text-galaxy-text">
                TAUFIQ RAHMADI
              </h4>
              <p class="mt-1 text-2xl md:text-4xl font-extrabold text-galaxy-text">
                I'am a <span ref="typingSpan"
                  class="font-sciFi bg-clip-text text-transparent bg-gradient-to-r from-glow-end to-glow-start">
                  {{ currentText }}
                </span>
              </p>
              <p class="mt-2 text-lg md:text-xl font-extralight text-galaxy-text">
                Welcome to my portfolio website!
              </p>
              <div class="mt-6 flex flex-wrap gap-3 font-sciFi">
                <Button color="outline" size="md" icon="download" @click="downloadCV">See CV</Button>
                <Button color="outline" size="md" :icon="['fab', 'github']"
                  @click="() => openLink(githubLink)">GitHub</Button>
                <Button color="outline" size="md" :icon="['fab', 'linkedin-in']"
                  @click="() => openLink(linkedinLink)">LinkedIn</Button>
              </div>
            </div>

            <div class="flex-shrink-0">
              <div ref="profileElement" class="profile-circle relative flex items-center justify-center"
                @mouseenter="hoverSound.play" @mouseleave="hoverSound.stop">
                <img src="@/assets/images/profil.jpg" alt="Taufiq" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        <div id="profil" class="relative -mt-10 mb-10 mx-5 md:mx-24 rounded-xl p-6 pb-10">
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
import ProfileSection from '@/views/ProfileSection.vue'
import TechShowcase from '@/views/TechShowcase.vue'
import ProjectsSection from '@/views/ProjectsSection.vue'
import Button from '@/components/ui/Button.vue'
import ExperienceSection from '@/views/ExperienceSection.vue'
import ContactSection from '@/views/ContactSection.vue'

import { useTypingAnimation } from '@/components/composables/useTypingAnimation'
import { useHoverSound } from '@/components/composables/useHoverSound'
import { downloadCV, openLink } from '@/components/composables/useExternalAction'

import { onMounted, onUnmounted, onActivated, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger, ScrollSmoother, ScrollToPlugin } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin)

let smoother = null
const isScrollReady = ref(false)

onMounted(() => {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search)
  }

  window.scrollTo(0, 0)

  const waitForReady = () => {
    const fontsLoaded = document.fonts ? document.fonts.ready : Promise.resolve()

    const bgImg = new Image()
    bgImg.src = bgImage
    const imageLoaded = new Promise((resolve) => {
      if (bgImg.complete && bgImg.naturalHeight !== 0) {
        resolve()
      } else {
        bgImg.onload = resolve
        bgImg.onerror = resolve
      }
    })

    const domReady = new Promise(r => setTimeout(r, 100))
    return Promise.all([fontsLoaded, imageLoaded, domReady])
  }

  waitForReady().then(() => {
    const wrapper = document.getElementById('smooth-wrapper')
    const content = document.getElementById('smooth-content')
    if (!wrapper || !content) return

    smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 2,
      effects: true,
      smoothTouch: 0.1,
      normalizeScroll: true,
      ignoreMobileResize: true,
      preventDefault: true,
    })

    setTimeout(() => {
      if (content.scrollHeight < 100) {
        console.warn('[GSAP] Content height still too small:', content.scrollHeight)
      }

      gsap.to(window, {
        duration: 0.9,
        scrollTo: { y: 0, autoKill: false },
        ease: 'power2.out',
        onComplete: () => {
          ScrollTrigger.refresh()
          isScrollReady.value = true
        }
      })
    }, 150)
  })

  const handleClick = (e) => {
    const link = e.target.closest('a[href^="#"]')
    if (!link) return
    e.preventDefault()
    const href = link.getAttribute('href').trim()
    const target = document.querySelector(href)
    if (!target) return

    gsap.to(window, {
      duration: 1.0,
      scrollTo: { y: target, offsetY: 80, autoKill: false },
      ease: 'power2.out',
      onComplete: () => history.pushState(null, '', href)
    })
  }

  document.addEventListener('click', handleClick)

  onUnmounted(() => {
    document.removeEventListener('click', handleClick)
    smoother?.kill()
    smoother = null
    ScrollTrigger.killAll()
  })
})

onActivated(() => {
  setTimeout(() => {
    smoother?.refresh()
    ScrollTrigger.refresh()
  }, 100)
})

// ========== Composables & Data ==========
const words = [
  "Web Developer.",
  "Mobile Developer.",
  "Frontend Engineer.",
  "Tech Enthusiast."
]

const { currentText } = useTypingAnimation(words)
const hoverSound = useHoverSound('/src/assets/images/Sound.mp3', 0.3)

const githubLink = 'https://github.com/taufiqrhmd'
const linkedinLink = 'https://linkedin.com/in/mohamad-taufiq-rahmadi'
</script>
