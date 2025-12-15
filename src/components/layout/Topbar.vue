<template>
  <header class="fixed top-5 left-10 right-10 z-50 bg-transparent font-sciFi backdrop-blur-sm px-4 md:px-8 py-2 rounded-lg text-white">
    <div class="container mx-auto px-4 py-2 flex justify-between items-center">
      <div class="text-xl font-bold pl-10">
        Taufiq
      </div>

      <nav class="hidden md:flex space-x-8">
        <a href="#profil" class="hover:text-indigo-300 transition-colors">Profil</a>
        <a href="#skill" class="hover:text-indigo-300 transition-colors">Skill</a>
        <a href="#project" class="hover:text-indigo-300 transition-colors">Proyek</a>
        <a href="#contact" class="hover:text-indigo-300 transition-colors">Kontak</a>
      </nav>

      <button class="md:hidden text-gray-400 hover:text-white focus:outline-none" @click="toggleMobileMenu">
        <span class="text-2xl">{{ isMobileMenuOpen ? '✕' : '☰' }}</span>
      </button>
    </div>

    <div v-if="isMobileMenuOpen" class="md:hidden bg-gray-800/95 backdrop-blur-lg py-4 px-4 border-t border-gray-700">
      <div class="flex flex-col space-y-4">
        <a href="#profil" class="py-2 hover:text-indigo-300 transition-colors" @click="closeMobileMenu">
          Profil
        </a>
        <a href="#skill" class="py-2 hover:text-indigo-300 transition-colors" @click="closeMobileMenu">
          Skill
        </a>
        <a href="#project" class="py-2 hover:text-indigo-300 transition-colors" @click="closeMobileMenu">
          Proyek
        </a>
        <a href="#contact" class="py-2 hover:text-indigo-300 transition-colors" @click="closeMobileMenu">
          Kontak
        </a>
      </div>
    </div>
  </header>
</template>

<script>
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
    }
  },
  mounted() {
    // Optional: close menu when clicking outside
    document.addEventListener('click', (event) => {
      const topbar = this.$el
      if (!topbar.contains(event.target) && this.isMobileMenuOpen) {
        this.closeMobileMenu()
      }
    })
  }
}
</script>