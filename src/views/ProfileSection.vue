<template>
  <section id="profil"
    class="galaxy-outline-moving bg-galaxy-bg rounded-xl z-10 py-8 md:py-12 px-4 md:px-10 relative overflow-hidden pb-10">
    <div class="flex flex-col md:flex-col items-start gap-6 md:gap-8 max-w-7xl mx-auto">
      <div class="flex-shrink-0 w-full md:w-full">
        <h1
          class="text-3xl md:text-6xl lg:text-7xl font-title font-bold italic bg-gradient-to-r from-galaxy-text-muted via-indigo-500 to-galaxy-magenta bg-clip-text text-transparent tracking-tighter leading-none">
          / ABOUT
        </h1>
      </div>

      <div class="flex flex-col md:flex-row items-start gap-6 md:gap-12 max-w-7xl px-10 mx-auto">
        <div class="flex-shrink-0 mt-1" aria-hidden="true">
          <div class="relative flex items-center justify-center">
            <img src="@/assets/images/profil.jpg" alt="Taufiq"
              class="w-24 h-24 md:w-72 md:h-72 rounded-sm object-cover" />
          </div>
        </div>

        <div class="flex-1 min-w-0 space-y-6 font-sans font-light">
          <blockquote class="text-md md:text-lg text-galaxy-text leading-relaxed font-medium text-justify">
            {{ desc }}
          </blockquote>

          <p class="text-sm uppercase pt-10 tracking-wider text-galaxy-text opacity-80">
            Currently working on freelance projects as a Fullstack Developer
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const desc = ref(`"Taufiq Rahmadi is a skilled and experienced freelance web and mobile application developer. 
He is recognized for his ability to seamlessly blend appealing design with robust technical implementation, 
delivering responsive, intuitive, and high-performance digital solutions. 
Passionate about crafting smooth user experiences across both web and mobile platforms, 
Taufiq combines strong UI/UX principles with efficient and scalable coding practices. 
His commitment to quality, maintainability, and innovation is evident in every project he undertakes"`)
</script>