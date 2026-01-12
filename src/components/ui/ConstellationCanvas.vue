<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const canvasRef = ref(null);
let animationId = null;

const initConstellation = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  
  // Mengambil tinggi total halaman berdasarkan ScrollTrigger
  const maxScrollY = ScrollTrigger.maxScroll(window);
  const width = window.innerWidth;
  const height = maxScrollY + window.innerHeight;

  canvas.width = width;
  canvas.height = height;

  const density = width < 768 ? 8000 : 6000;
  const starCount = Math.min(400, Math.floor((width * height) / density));

  const config = {
    starColor: 'rgba(220, 240, 255, 0.92)',
    lineColorBase: [96, 165, 250],
    starCount: starCount,
    maxDistance: 140,
    minRadius: 1.0,
    maxRadius: 2.0,
  };

  const stars = Array.from({ length: config.starCount }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * (config.maxRadius - config.minRadius) + config.minRadius,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
  }));

  const draw = () => {
    if (!canvasRef.value) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
      star.x += star.vx;
      star.y += star.vy;

      if (star.x < 0 || star.x > canvas.width) star.vx *= -1;
      if (star.y < 0 || star.y > canvas.height) star.vy *= -1;

      // Draw Star
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = config.starColor;
      ctx.shadowColor = config.starColor;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Lines
      stars.forEach(otherStar => {
        const dx = star.x - otherStar.x;
        const dy = star.y - otherStar.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.maxDistance) {
          const opacity = 1 - distance / config.maxDistance;
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(otherStar.x, otherStar.y);
          const [r, g, b] = config.lineColorBase;
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.35})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      });
    });
    animationId = requestAnimationFrame(draw);
  };

  draw();
};

onMounted(() => {
  // Tunggu sebentar agar ScrollTrigger di komponen lain selesai kalkulasi
  setTimeout(() => {
    ScrollTrigger.refresh();
    initConstellation();
  }, 1200);
});

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId);
});
</script>

<template>
  <canvas ref="canvasRef" class="absolute inset-0 z-[1] pointer-events-none"></canvas>
</template>