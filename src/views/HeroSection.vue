<template>
  <section id="hero-section" class="relative z-10 flex items-end justify-center overflow-hidden w-full min-h-screen">
    <div class="absolute bottom-0 left-0 w-full h-28 md:h-36 z-30 bg-gradient-to-t from-galaxy-darker to-transparent">
    </div>
    <div class="relative w-full h-full max-w-7xl mx-auto flex items-end justify-center">
      <img ref="heroImg" src="/images/bg.png" alt="Hero Profile"
        class="relative h-[90%] w-auto object-contain object-bottom z-20 pointer-events-none" />

      <div ref="interactiveArea"
        class="absolute bottom-10 md:bottom-20 z-40 w-full flex justify-center items-center transform translate-y-10 md:translate-y-16"
        @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
        <div class="relative inline-block">
          <div ref="roleTextContainer"
            class="absolute -top-8 md:-top-12 left-0 w-full overflow-hidden h-8 md:h-12 pointer-events-none"
            style="opacity: 0;">

            <div class="scan-line absolute left-0 w-2/6 h-[1px] bg-gradient-to-r from-galaxy-cyan via-galaxy-cyan to-transparent z-50 shadow-[0_0_15px_rgba(255,0,255,0.8)]">
            </div>

            <div class="relative h-full w-full font-sciFi">
              <span v-for="(word, index) in words" :key="index" :ref="(el) => roleWords[index] = el"
                class="absolute left-2 top-0 w-full text-left text-sm md:text-2xl font-bold text-galaxy-text-muted uppercase tracking-[0.2em] flex items-center h-full">
                {{ word }}
              </span>
            </div>
          </div>

          <div class="relative overflow-visible pb-6 md:pb-10">
            <h1 ref="mainTitle"
              class="text-[15vw] md:text-[12vw] font-black uppercase leading-[0.9] text-transparent pointer-events-none"
              style="-webkit-text-stroke: 2px rgba(255,255,255,0.4);">
              TAUFIQ DEV
            </h1>

            <h1 ref="filledTitle"
              class="filled-text absolute top-0 left-0 w-full text-[15vw] md:text-[12vw] font-black uppercase leading-[0.9] text-galaxy-cyan pointer-events-none"
              style="clip-path: circle(0% at 50% 50%);">
              TAUFIQ DEV
            </h1>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';

// Data
const words = ["Web Developer.", "Mobile Developer.", "Frontend Engineer.", "Tech Enthusiast."];

// Refs
const heroImg = ref(null);
const mainTitle = ref(null);
const filledTitle = ref(null);
const roleTextContainer = ref(null);
const interactiveArea = ref(null);
const roleWords = ref([]); // array untuk menyimpan ref tiap role-word

// Timeline (opsional, untuk cleanup)
let heroTimeline = null;

onMounted(() => {
  // Pastikan semua ref sudah ada
  if (!heroImg.value || !mainTitle.value || !filledTitle.value) return;

  // 1. Intro Image
  gsap.from(heroImg.value, {
    y: 50,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out"
  });

  // 2. Intro Text Utama (kedua h1)
  gsap.from([mainTitle.value, filledTitle.value], {
    x: 50,
    opacity: 0,
    duration: 1.2,
    delay: 0.5,
    ease: "power3.out"
  });

  // 3. Role text container muncul & mulai animasi
  gsap.to(roleTextContainer.value, {
    opacity: 1,
    duration: 1,
    delay: 1.2,
    onStart: () => {
      // Set posisi awal role words
      const wordsEls = roleWords.value.filter(Boolean);
      gsap.set(wordsEls, { yPercent: 100 });
      if (wordsEls[0]) gsap.set(wordsEls[0], { yPercent: 0 });
    },
    onComplete: startRoleTextAnimation
  });
});

const startRoleTextAnimation = () => {
  const wordsEls = roleWords.value.filter(Boolean);
  const scanLine = roleTextContainer.value.querySelector('.scan-line');
  if (wordsEls.length === 0) return;

  gsap.set(wordsEls, { yPercent: 100, skewX: -20, opacity: 0 });
  gsap.set(wordsEls[0], { yPercent: 0, skewX: 0, opacity: 1 });
  gsap.set(scanLine, { top: "0%" });

  heroTimeline = gsap.timeline({ repeat: -1 });

  wordsEls.forEach((wordEl, i) => {
    const nextWordEl = wordsEls[(i + 1) % wordsEls.length];
    
    heroTimeline
      // 1. Gerakan Scan Line menyapu kebawah sebelum teks ganti
      .to(scanLine, { top: "100%", duration: 0.7, ease: "power2.inOut" }, "+=2")
      
      // 2. Teks lama keluar dengan efek miring (skew)
      .to(wordEl, {
        yPercent: 100,
        skewX: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power4.inOut"
      }, "<")

      // 3. Teks baru masuk dengan efek miring
      .fromTo(nextWordEl,
        { yPercent: -100, skewX: -20, opacity: 0 },
        {
          yPercent: 0,
          skewX: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
          immediateRender: false
        },
        "<0.1"
      )
      
      // 4. Scan Line balik ke atas dengan cepat untuk persiapan berikutnya
      .to(scanLine, { top: "0%", duration: 0.4, ease: "power2.out" });
  });
};

const handleMouseMove = (e) => {
  if (!filledTitle.value) return;
  const rect = interactiveArea.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  gsap.to(filledTitle.value, {
    clipPath: `circle(120px at ${x}px ${y}px)`,
    duration: 0.2,
    ease: "none",
    overwrite: "auto"
  });
};

const handleMouseLeave = (e) => {
  if (!filledTitle.value) return;
  const rect = interactiveArea.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  gsap.to(filledTitle.value, {
    clipPath: `circle(0px at ${x}px ${y}px)`,
    duration: 0.4,
    ease: "power2.in",
    overwrite: "auto"
  });
};

// Cleanup saat komponen dihancurkan (penting untuk SPA)
onBeforeUnmount(() => {
  if (heroTimeline) {
    heroTimeline.kill();
    heroTimeline = null;
  }
  // Bersihkan inline styles GSAP (opsional tapi baik)
  [heroImg, mainTitle, filledTitle, roleTextContainer].forEach(refEl => {
    if (refEl.value && refEl.value.style) {
      refEl.value.style.cssText = ''; // atau clearProps via GSAP jika diinginkan
    }
  });
});
</script>

<style scoped>
section {
  overflow: hidden;
}

@keyframes flicker {
  0% { opacity: 0.9; }
  5% { opacity: 0.5; }
  10% { opacity: 0.9; }
  15% { opacity: 0.3; }
  20% { opacity: 0.9; }
  100% { opacity: 1; }
}

.font-sciFi {
  text-shadow: 0 0 8px rgba(255, 0, 255, 0.4);
  animation: flicker 3s infinite;
}

.scan-line {
  pointer-events: none;
  mix-blend-mode: screen;
}

h1 {
  font-family: 'Arial Black', sans-serif;
  line-height: 0.9;
  white-space: nowrap;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  will-change: transform, opacity;
}

.filled-text {
  display: block;
  will-change: clip-path;
}

.inline-block {
  transform-style: preserve-3d;
}
</style>