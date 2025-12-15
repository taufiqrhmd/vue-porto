<template>
  <div class="h-screen overflow-auto bg-galaxy-darker">
    <Topbar />

    <div class="relative w-full h-screen flex items-center justify-center"
      :style="{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }">
      <div class="absolute inset-0 bg-galaxy-darker/80"></div>

      <div
        class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 py-10 px-6 md:px-12 lg:px-20 xl:px-32 w-full">
        <div class="text-left max-w-2xl">
          <h1
            class="text-3xl font-heading md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-glow-end to-glow-start">
            Hi, I'm Taufiq
          </h1>
          <p class="mt-2 font-sciFi text-2xl md:text-5xl font-extrabold text-galaxy-text leading-relaxed">
            WEB DEVELOPER
          </p>
          <p class="mt-2 font-sans font-extralight text-galaxy-text leading-relaxed">
            {{ desc }}
          </p>
          <div class="mt-6 flex flex-wrap gap-3 font-heading text-galaxy-text">
            <Button color="galaxy" size="md" @click="downloadCV">
              📄 See CV
            </Button>

            <Button color="outline" size="md" @click="openLink('https://github.com/taufiq')">
              🐱 GitHub
            </Button>

            <Button color="secondary" size="md" @click="openLink('https://linkedin.com/in/taufiq')">
              💼 LinkedIn
            </Button>
          </div>
        </div>

        <div class="flex-shrink-0">
          <div class="profile-circle relative flex items-center justify-center">
            <img src="@/assets/images/profil.jpg" alt="Taufik" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>

    <div class="galaxy-outline-moving relative -mt-10 mb-10 z-10 mx-4 md:mx-10 rounded-xl bg-galaxy-bg p-6 pb-10">
      <ProfileSection />
    </div>

  </div>
</template>

<script>
import Topbar from './components/layout/Topbar.vue'
import ProfileSection from './components/sections/ProfileSection.vue' 
import Button from './components/UI/Button.vue'

import bgImage from '@/assets/images/bg-milkyway.jpg'
const downloadCV = () => {
  // Ganti dengan path file CV-mu (host di public/ atau CDN)
  window.open('/cv/taufiq-cv-2025.pdf', '_blank')
}

const openLink = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

export default {
  name: 'App',
  components: {
    Topbar,
    Button,
    ProfileSection,
  },
  data() {
    return {
      bgImage,
      desc: 'I am a programmer with experience in web and mobile application development, with a strong interest and focus on frontend development. I enjoy building clean, responsive, and user-friendly interfaces, while paying close attention to usability and modern design'
    }
  }
}
</script>

<style scoped>
.profile-circle {
  position: relative;
  width: 16rem;
  height: 16rem;
  animation: float 6s ease-in-out infinite;
}

@media (min-width: 768px) {
  .profile-circle {
    width: 20rem;
    height: 20rem;
  }
}

/* 🔵 Soft nebula glow — kini pakai warna galaxy custom */
.profile-circle::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: linear-gradient(135deg,
      theme('colors.galaxy-cyan / 30%'),
      theme('colors.galaxy-purple / 25%'),
      theme('colors.galaxy-magenta / 20%'));
  filter: blur(40px);
  opacity: 0.7;
  z-index: -1;
}

/* 🌠 Animated conic gradient border — disesuaikan ke palet galaxy */
.profile-circle::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 9999px;
  background: conic-gradient(from 0deg,
      theme('colors.galaxy-cyan'),
      theme('colors.galaxy-blue'),
      theme('colors.galaxy-purple'),
      theme('colors.galaxy-magenta'),
      theme('colors.galaxy-cyan'));
  z-index: -2;
  animation: rotate 10s linear infinite;
}

/* Foto utama */
.profile-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 9999px;
  border: 1px solid theme('colors.galaxy-text / 10%');
  box-shadow: 0 8px 32px rgba(10, 16, 44, 0.5);
  /* sesuai galaxy-bg gelap */
  transition: transform 0.4s ease, filter 0.4s ease;
}

.profile-circle:hover img {
  transform: scale(1.05) rotate(2deg);
  filter: brightness(1.15) saturate(1.1);
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-12px) rotate(1deg);
  }
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>