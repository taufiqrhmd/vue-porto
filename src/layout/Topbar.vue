<template>
  <header
    class="fixed left-10 right-10 z-50 bg-transparent font-sciFi backdrop-blur-sm px-4 md:px-8 py-2 rounded-lg text-white animate-fade-in-down">
    <div class="container mx-auto px-4 py-2 flex justify-between items-center">
      <div id="brand-logo" class="text-xl font-bold cursor-pointer hover:text-blue-600 transition-colors"
        @click="scrollToTop">
        Taufiq
      </div>

      <nav class="hidden md:flex space-x-8">
        <button @click="scrollToSection('#profil')" class="hover:text-indigo-300 transition-colors">About</button>
        <button @click="scrollToSection('#projects')" class="hover:text-indigo-300 transition-colors">Projects</button>
        <button @click="scrollToSection('#experience')"
          class="hover:text-indigo-300 transition-colors">Experience</button>
        <button @click="scrollToSection('#contact')" class="hover:text-indigo-300 transition-colors">Contact</button>
      </nav>

      <button class="md:hidden text-gray-400 hover:text-white focus:outline-none" @click="toggleMobileMenu">
        <span class="text-2xl">{{ isMobileMenuOpen ? '✕' : '☰' }}</span>
      </button>
    </div>

    <transition name="slide-fade">
      <div v-if="isMobileMenuOpen" class="md:hidden bg-gray-800/95 backdrop-blur-lg py-4 px-4 border-t border-gray-700">
      <div class="flex flex-col space-y-4 text-left">
        <button @click="scrollToSection('#profil')"
          class="py-2 text-left hover:text-indigo-300 transition-colors">About</button>
        <button @click="scrollToSection('#projects')"
          class="py-2 text-left hover:text-indigo-300 transition-colors">Projects</button>
        <button @click="scrollToSection('#experience')"
          class="py-2 text-left hover:text-indigo-300 transition-colors">Experience</button>
        <button @click="scrollToSection('#contact')"
          class="py-2 text-left hover:text-indigo-300 transition-colors">Contact</button>
      </div>
    </div>
    </transition>
  </header>
</template>

<script>
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Registrasi plugin di luar export default
gsap.registerPlugin(ScrollToPlugin)

export default {
  name: 'Topbar',
  data() {
    return {
      isMobileMenuOpen: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false
    },
    scrollToSection(id) {
      // id yang masuk adalah '#profil'
      const target = document.querySelector(id);

      if (target) {
        gsap.to(window, {
          duration: 1.2,
          scrollTo: {
            y: target,
            offsetY: 80,
            autoKill: false
          },
          ease: 'power2.inOut',
          onComplete: () => {
            // Menghapus '#' untuk URL. Misal: '#profil' menjadi '/profil'
            const cleanPath = id.replace('#', '/');
            history.pushState(null, null, cleanPath);
          }
        });
      }
      this.closeMobileMenu();
    },

    scrollToTop() {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: 0 },
        ease: 'power2.inOut',
        onComplete: () => {
          // Kembali ke root path '/'
          history.pushState(null, null, '/');
        }
      });
      this.closeMobileMenu();
    }
  }
}
</script>

<style scoped>
.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out forwards;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animasi Transition Vue untuk Mobile Menu */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>