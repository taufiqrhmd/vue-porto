<template>
  <section id="profile" ref="sectionContainer" class="min-h-screen pt-32 relative overflow-hidden opacity-0">
    <div class="absolute inset-0 bg-scanlines opacity-[0.03] pointer-events-none"></div>

    <div class="galaxy-outline-moving bg-galaxy-bg rounded-xl z-10 p-10 md:py-12 px-4 md:px-10 md:mx-24 relative overflow-hidden border border-white/5">
      
      <div class="absolute inset-0 pointer-events-none">
        <div class="shimmer-sweep"></div>
      </div>

      <div class="absolute top-4 left-6 text-[10px] font-mono text-galaxy-cyan opacity-70 hidden md:block tracking-widest">
        <span class="inline-block w-2 h-2 rounded-full bg-galaxy-cyan animate-pulse mr-2"></span>
        SYS_REF: 001-ALPHA // TR_CORE
      </div>
      <div class="absolute bottom-4 right-6 text-[10px] font-mono text-galaxy-magenta opacity-70 hidden md:block tracking-widest">
        STATUS: <span class="text-galaxy-magenta animate-pulse">ONLINE</span>
      </div>

      <div class="flex flex-col items-start gap-6 md:gap-8 max-w-7xl mx-auto relative z-20">
        <div class="flex-shrink-0 w-full">
          <h1 ref="title"
            class="text-3xl md:text-6xl lg:text-7xl font-title italic bg-gradient-to-r from-glow-start via-glow-mid to-glow-end bg-clip-text text-transparent tracking-tighter leading-none">
            / About
          </h1>
        </div>

        <div class="flex flex-col md:flex-row items-start gap-6 md:gap-12 max-w-7xl px-4 md:px-10 mx-auto">
          <div ref="profileImg" class="flex-shrink-0 mt-1 relative group" aria-hidden="true">
            <div class="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-galaxy-cyan z-20 transition-all duration-500 group-hover:shadow-[0_0_15px_#4fc3f7] group-hover:-top-3 group-hover:-left-3"></div>
            <div class="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-galaxy-magenta z-20 transition-all duration-500 group-hover:shadow-[0_0_15px_#c77dff] group-hover:-bottom-3 group-hover:-right-3"></div>
            
            <div class="relative overflow-hidden rounded-sm border border-white/10 bg-galaxy-darker">
              <div class="absolute inset-0 bg-scanlines opacity-20 pointer-events-none z-10"></div>
              <img src="/images/profil.jpg" alt="Taufiq" 
                class="w-28 h-40 md:w-80 md:h-[370px] rounded-sm object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-tr from-galaxy-cyan/30 via-transparent to-galaxy-magenta/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
            </div>
          </div>

          <div ref="textContent" class="flex-1 min-w-0 space-y-6 font-sans font-light">
            <blockquote class="text-md md:text-lg text-galaxy-text leading-relaxed text-justify relative">
              <span class="text-galaxy-cyan font-mono opacity-50 text-2xl">“</span>
              {{ desc }}
              <span class="text-galaxy-cyan ml-2 font-mono opacity-50 text-2xl">”</span>
            </blockquote>
            
            <p class="text-xs md:text-sm uppercase tracking-[0.2em] text-galaxy-text-muted opacity-80 font-mono pt-4 border-t border-white/5">
              // <span class="text-glow-mid">Currently_working:</span> freelance_projects [Fullstack_Dev]
            </p>

            <div class="flex flex-wrap gap-4">
              <Button color="outline" size="sm" icon="download" class="btn-sci-fi" @click="downloadCV">See CV</Button>
              <Button v-if="githubLink" color="outline" size="sm" :icon="['fab', 'github']" class="btn-sci-fi"
                @click="(e) => { openLink(githubLink); e.currentTarget.blur(); }">GitHub</Button>
              <Button v-if="linkedinLink" color="outline" size="sm" :icon="['fab', 'linkedin-in']" class="btn-sci-fi"
                @click="(e) => { openLink(linkedinLink); e.currentTarget.blur(); }">LinkedIn</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '@/components/ui/VButton.vue';
import { downloadCV, openLink } from '@/components/composables/useExternalAction';
import { supabase } from '@/lib/supabase';

gsap.registerPlugin(ScrollTrigger);

const sectionContainer = ref(null);
const title = ref(null);
const profileImg = ref(null);
const textContent = ref(null);

const githubLink = ref('https://github.com/taufiqrhmd');
const linkedinLink = ref('https://linkedin.com/in/mohamad-taufiq-rahmadi');

const desc = ref(`Taufiq Rahmadi is a freelance fullstack developer with 2.5+ years of experience crafting responsive, 
high-performance web and mobile applications—where elegant UI/UX design meets robust technical implementation. 
Specializing in modern stacks, he builds digital products that are not only functional but deeply intuitive, 
leveraging interactive animations, thoughtful micro-interactions, and seamless user flows to create what he calls 
invisible technology: solutions that assist without distraction and empower without complexity. Guided by a strong 
commitment to quality, maintainability, and continuous innovation, Taufiq approaches every project as an opportunity to 
engineer meaningful, human-centered experiences—where code, design, and purpose aligns.`)

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionContainer.value,
      start: "top 75%",
      toggleActions: "play none none none"
    }
  });

  // 1. Flicker Entrance
  tl.to(sectionContainer.value, { opacity: 1, duration: 0.1, repeat: 2, yoyo: true })
    .to(sectionContainer.value, { opacity: 1, duration: 0.3 })
    
  // 2. Title Slide with Glitch-like ease
  tl.from(title.value, {
    x: -20,
    opacity: 0,
    duration: 0.8,
    ease: "power4.out"
  }, "-=0.2")

  // 3. Image Scale with Back ease
  tl.from(profileImg.value, {
    scale: 0.9,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.2)"
  }, "-=0.5")

  // 4. Staggered Text Reveal
  const textElements = textContent.value.children;
  tl.from(textElements, {
    y: 20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: "power2.out"
  }, "-=0.7");
});

// Fetching Supabase Logic tetap sama
onMounted(async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('github_url, linkedin_url')
      .single();

    if (data) {
      githubLink.value = data.github_url || githubLink.value;
      linkedinLink.value = data.linkedin_url || linkedinLink.value;
    }
    if (error) throw error;
  } catch (err) {
    console.error('Error fetching social links:', err.message);
  }
});
</script>

<style scoped>
.font-title {
  /* Memberikan efek pendaran halus sesuai warna tengah gradien */
  filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.4));
}

.shimmer-sweep {
  position: absolute;
  top: 0;
  left: -150%;
  width: 60%; /* Sedikit lebih lebar */
  height: 100%;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(79, 195, 247, 0.1) 30%,  /* Cyan tipis */
    rgba(255, 255, 255, 0.2) 50%, /* Putih terang di tengah untuk efek kilau */
    rgba(168, 85, 247, 0.1) 70%,  /* Purple tipis */
    transparent 100%
  );
  transform: skewX(-25deg);
  /* Hapus kata 'inset' karena inset bukan properti animasi standar */
  animation: sweep 6s infinite ease-in-out; 
  z-index: 15;
}

@keyframes sweep {
  0% { left: -150%; }
  20% { left: 150%; } /* Selesai menyapu dalam 1.2 detik (20% dari 6s) */
  100% { left: 150%; } /* Sisanya jeda waktu diam */
}

/* 2. Monitor Scanlines */
.bg-scanlines {
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(0, 0, 0, 0.8) 51%
  );
  background-size: 100% 4px;
}

/* 3. Button Sci-Fi Glow */
.btn-sci-fi {
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  border-color: rgba(79, 195, 247, 0.3) !important;
  color: #e6f0ff !important;
}

.btn-sci-fi:hover {
  background: rgba(79, 195, 247, 0.1) !important;
  box-shadow: 
    0 0 10px rgba(79, 195, 247, 0.4),
    0 0 20px rgba(168, 85, 247, 0.2);
  transform: translateY(-2px) scale(1.02);
  border-color: #4fc3f7 !important;
}

/* 4. Judul Blinking Cursor */
h1::after {
  content: '_';
  color: #4fc3f7;
  text-shadow: 0 0 8px #4fc3f7;
  animation: blink 1.2s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

/* 5. Custom Stagger for Description */
blockquote {
  border-left: 2px solid rgba(168, 85, 247, 0.3);
  padding-left: 1.5rem;
}
</style>