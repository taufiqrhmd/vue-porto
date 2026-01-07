<template>
  <header ref="topbarRef"
    class="fixed left-6 right-6 md:left-10 md:right-10 z-[60] bg-transparent font-sciFi backdrop-blur-md px-4 md:px-8 py-3 rounded-xl text-galaxy-text opacity-0 border-b border-galaxy-blue/20"
    :class="{ 'pointer-events-none': isHidden }">

    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-galaxy-cyan to-transparent shadow-[0_0_10px_#4fc3f7]"></div>

    <div class="container mx-auto flex justify-center items-center">
      <nav class="hidden md:flex items-center space-x-2 tracking-[0.2em]">
        
        <button @click="scrollToSection('#profile')"
          class="nav-btn group relative px-6 py-2 uppercase text-[11px] text-galaxy-text-muted hover:text-galaxy-cyan transition-all duration-300">
          <span class="absolute left-0 opacity-0 group-hover:opacity-100 group-hover:left-2 transition-all text-galaxy-cyan">[</span>
          <span class="relative z-10">About</span>
          <span class="absolute right-0 opacity-0 group-hover:opacity-100 group-hover:right-2 transition-all text-galaxy-cyan">]</span>
          <div class="scanner-line"></div>
        </button>

        <button @click="scrollToSection('#projects')"
          class="nav-btn group relative px-6 py-2 uppercase text-[11px] text-galaxy-text-muted hover:text-galaxy-cyan transition-all duration-300">
          <span class="absolute left-0 opacity-0 group-hover:opacity-100 group-hover:left-2 transition-all text-galaxy-cyan">[</span>
          <span class="relative z-10">Projects</span>
          <span class="absolute right-0 opacity-0 group-hover:opacity-100 group-hover:right-2 transition-all text-galaxy-cyan">]</span>
          <div class="scanner-line"></div>
        </button>

        <button @click="scrollToSection('#experience')"
          class="nav-btn group relative px-6 py-2 uppercase text-[11px] text-galaxy-text-muted hover:text-galaxy-cyan transition-all duration-300">
          <span class="absolute left-0 opacity-0 group-hover:opacity-100 group-hover:left-2 transition-all text-galaxy-cyan">[</span>
          <span class="relative z-10">Experience</span>
          <span class="absolute right-0 opacity-0 group-hover:opacity-100 group-hover:right-2 transition-all text-galaxy-cyan">]</span>
          <div class="scanner-line"></div>
        </button>

        <button @click="scrollToSection('#contact')"
          class="nav-btn group relative px-6 py-2 uppercase text-[11px] text-galaxy-text-muted hover:text-galaxy-cyan transition-all duration-300">
          <span class="absolute left-0 opacity-0 group-hover:opacity-100 group-hover:left-2 transition-all text-galaxy-cyan">[</span>
          <span class="relative z-10">Contact</span>
          <span class="absolute right-0 opacity-0 group-hover:opacity-100 group-hover:right-2 transition-all text-galaxy-cyan">]</span>
          <div class="scanner-line"></div>
        </button>

      </nav>

      <button class="md:hidden text-galaxy-cyan p-2 ml-auto focus:outline-none" @click="toggleMobileMenu" :disabled="isHidden">
        <div class="w-6 h-5 flex flex-col justify-between items-end">
          <span class="h-[1.5px] bg-galaxy-cyan transition-all duration-300" :class="isMobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'"></span>
          <span class="h-[1.5px] bg-galaxy-cyan transition-all duration-300" :class="isMobileMenuOpen ? 'opacity-0' : 'w-4'"></span>
          <span class="h-[1.5px] bg-galaxy-cyan transition-all duration-300" :class="isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'"></span>
        </div>
      </button>
    </div>

    <transition name="scifi-slide">
      <div v-if="isMobileMenuOpen"
        class="md:hidden absolute top-full left-0 right-0 mt-3 bg-galaxy-card/95 backdrop-blur-xl py-6 px-6 rounded-2xl border border-galaxy-blue/30 shadow-2xl">
        <div class="flex flex-col space-y-4">
          <button @click="scrollToSection('#profile')" class="text-left py-3 px-4 border-l-2 border-transparent hover:border-galaxy-cyan hover:bg-galaxy-cyan/10 text-galaxy-text-muted hover:text-galaxy-cyan transition-all uppercase tracking-widest text-xs">
            About
          </button>
          <button @click="scrollToSection('#projects')" class="text-left py-3 px-4 border-l-2 border-transparent hover:border-galaxy-cyan hover:bg-galaxy-cyan/10 text-galaxy-text-muted hover:text-galaxy-cyan transition-all uppercase tracking-widest text-xs">
            Projects
          </button>
          <button @click="scrollToSection('#experience')" class="text-left py-3 px-4 border-l-2 border-transparent hover:border-galaxy-cyan hover:bg-galaxy-cyan/10 text-galaxy-text-muted hover:text-galaxy-cyan transition-all uppercase tracking-widest text-xs">
            Experience
          </button>
          <button @click="scrollToSection('#contact')" class="text-left py-3 px-4 border-l-2 border-transparent hover:border-galaxy-cyan hover:bg-galaxy-cyan/10 text-galaxy-text-muted hover:text-galaxy-cyan transition-all uppercase tracking-widest text-xs">
            Contact
          </button>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

export default {
  name: 'Topbar',
  data() {
    return {
      isMobileMenuOpen: false,
      lastScrollY: 0,
      ticking: false,
      hideTimeout: null,
      isHidden: false
    }
  },
  mounted() {
    this.initEntranceAnimation()
    this.setupScrollBehavior()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll, { passive: true })
    if (this.hideTimeout) clearTimeout(this.hideTimeout)
  },
  methods: {
    initEntranceAnimation() {
      this.$nextTick(() => {
        const tl = gsap.timeline({ delay: 0.2 });

        // 1. Topbar container expansion (Cinematic effect)
        tl.fromTo(this.$refs.topbarRef, 
          { y: -60, opacity: 0, scaleX: 0.8 },
          { y: 0, opacity: 1, scaleX: 1, duration: 0.8, ease: 'expo.out' }
        );

        // 2. Manual Buttons stagger
        tl.fromTo('.nav-btn',
          { y: -20, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.5, 
            ease: 'power2.out', 
            stagger: 0.08 
          },
          "-=0.4"
        );
      })
    },
    toggleMobileMenu() {
      if (this.isHidden) return 
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false
    },
    scrollToSection(id) {
      const target = document.querySelector(id)
      if (target) {
        if (this.isHidden) {
          this.animateTopbar(true)
        }
        gsap.to(window, {
          duration: 1.2,
          scrollTo: { y: target, autoKill: false },
          ease: 'power2.inOut',
          onComplete: () => {
            const cleanPath = id.replace('#', '/')
            history.replaceState(null, null, cleanPath)
          }
        })
      }
      this.closeMobileMenu()
    },
    setupScrollBehavior() {
      const onScroll = () => {
        if (!this.isHidden) {
          this.animateTopbar(false)
        }

        if (this.hideTimeout) {
          clearTimeout(this.hideTimeout)
        }

        this.hideTimeout = setTimeout(() => {
          this.animateTopbar(true)
        }, 1000)
      }

      window.addEventListener('scroll', onScroll, { passive: true })
      this.onScroll = onScroll
    },
    animateTopbar(show) {
      if (this.isHidden === !show) return
      this.isHidden = !show

      gsap.to(this.$refs.topbarRef, {
        y: show ? 0 : -80,
        opacity: show ? 1 : 0,
        duration: show ? 0.55 : 0.4,
        ease: show ? 'expo.out' : 'power2.in',
        overwrite: 'auto'
      })
    }
  }
}
</script>

<style scoped>
.nav-btn {
  overflow: hidden;
  position: relative;
}

/* Scanning Laser Line */
.scanner-line {
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #4fc3f7, transparent);
  box-shadow: 0 0 10px #4fc3f7;
  opacity: 0;
  pointer-events: none;
}

.nav-btn:hover .scanner-line {
  animation: scanLoop 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes scanLoop {
  0% { top: -10%; opacity: 0; }
  30% { opacity: 1; }
  70% { opacity: 1; }
  100% { top: 110%; opacity: 0; }
}

/* Slide transition for mobile menu */
.scifi-slide-enter-active,
.scifi-slide-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.scifi-slide-enter-from,
.scifi-slide-leave-to {
  transform: translateY(-12px) scaleY(0.97);
  opacity: 0;
  filter: blur(5px);
}
</style>