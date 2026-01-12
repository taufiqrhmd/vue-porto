<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { gsap } from 'gsap';

const props = defineProps({
  words: {
    type: Array,
    default: () => ["Web Developer.", "Mobile Developer.", "Frontend Engineer."]
  },
  delay: { type: Number, default: 0.6 } 
});

const roleTextContainer = ref(null);
const roleWords = ref([]);
let heroTimeline = null;

const setRoleWordsRef = (el) => {
  if (el && !roleWords.value.includes(el)) roleWords.value.push(el);
};

const startRoleTextAnimation = () => {
  const wordsEls = roleWords.value.filter(Boolean);
  if (wordsEls.length === 0) return;

  // Initial setup untuk loop (setelah entrance selesai)
  gsap.set(wordsEls, { yPercent: 100, skewX: -20, opacity: 0 });
  gsap.set(wordsEls[0], { yPercent: 0, skewX: 0, opacity: 1 });

  heroTimeline = gsap.timeline({ repeat: -1 });
  wordsEls.forEach((wordEl, i) => {
    const nextWordEl = wordsEls[(i + 1) % wordsEls.length];
    heroTimeline
      .to(wordEl, {
        yPercent: 100,
        skewX: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power4.inOut"
      }, "+=2.5")
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
        "-=0.4"
      );
  });
};

onMounted(async () => {
  await nextTick();
  
  // 1. "SEEDING" - Paksa posisi awal dari script agar tidak mengandalkan CSS saja
  // Ini menghilangkan efek "pop" karena GSAP langsung mengontrol elemen sejak milidetik pertama
  gsap.set(roleTextContainer.value, { 
    x: 60, 
    opacity: 0,
    visibility: 'visible' // Pastikan terlihat hanya setelah GSAP siap
  });

  // 2. ENTRANCE ANIMATION
  gsap.to(roleTextContainer.value, {
    x: 0,
    opacity: 1,
    duration: 1.5, // Durasi lebih lama agar "meluncur", bukan "pop"
    delay: props.delay,
    ease: "power4.out", // Easing yang sangat smooth di akhir
    onComplete: startRoleTextAnimation
  });
});

onUnmounted(() => {
  if (heroTimeline) heroTimeline.kill();
});
</script>

<template>
  <div ref="roleTextContainer"
    class="role-rotator-container absolute -top-8 md:-top-12 left-0 w-full overflow-hidden h-8 md:h-12 pointer-events-none"
    style="visibility: hidden;"> <div class="relative h-full w-full font-sciFi">
      <span 
        v-for="(word, index) in words" 
        :key="index" 
        :ref="setRoleWordsRef"
        class="role-word absolute left-2 top-0 w-full text-left text-sm md:text-2xl font-bold text-white/70 uppercase tracking-[0.2em] flex items-center h-full whitespace-nowrap"
      >
        {{ word }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.role-rotator-container {
  will-change: transform, opacity;
}

.role-word {
  /* Hanya kata pertama yang boleh terlihat di awal */
  opacity: 0; 
}

.role-word:first-child {
  opacity: 1;
}

@keyframes flicker {
  0%, 10%, 20%, 100% { opacity: 1; }
  5%, 15% { opacity: 0.5; }
}

.font-sciFi {
  text-shadow: 0 0 10px rgba(0, 247, 255, 0.5);
  animation: flicker 4s infinite;
}
</style>