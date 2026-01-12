<template>
  <section id="hero-section" class="relative z-10 flex items-end justify-center overflow-hidden w-full min-h-screen">
    <div class="absolute bottom-0 left-0 w-full h-28 md:h-36 z-30 bg-gradient-to-t from-[#0a0a15] to-transparent">
    </div>

    <div class="relative w-full h-full max-w-7xl mx-auto flex items-end justify-center">
      <img ref="heroImg" src="/images/bg.png" alt="Hero Profile"
        class="relative h-[90%] w-auto object-contain object-bottom z-20 pointer-events-none" />
      <div
        class="absolute bottom-10 md:bottom-20 z-40 w-full flex justify-center items-center transform translate-y-10 md:translate-y-16">
        <div class="relative inline-block">
          <RoleRotator :words="wordsList" :delay="0.7" />
          <InteractiveTitle ref="titleRef" text="TAUFIQ DEV" />
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import RoleRotator from '@/components/ui/RoleRotator.vue';
import InteractiveTitle from '@/components/ui/InteractiveTitle.vue';

const heroImg = ref(null);
const titleRef = ref(null);
const wordsList = ["Web Developer.", "Mobile Developer.", "Frontend Engineer.", "UI/UX Designer."];

onMounted(() => {
  // Animasi Intro Image
  gsap.from(heroImg.value, {
    y: 60,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out"
  });

  // Animasi Intro Title (Mengakses ref di dalam komponen anak)
if (titleRef.value) {
    gsap.from([titleRef.value.mainTitle, titleRef.value.filledTitle], {
      y: 40,        // Tambahkan sedikit gerakan y agar konsisten
      opacity: 0, 
      duration: 1.2, 
      delay: 0.4, 
      ease: "power3.out"
    });
  }
});
</script>
