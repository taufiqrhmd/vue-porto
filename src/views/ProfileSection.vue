<template>
  <section id="profile" ref="sectionContainer" class="min-h-screen pt-20 md:pt-32 relative overflow-hidden opacity-0">
    <div class="absolute inset-0 bg-scanlines-global opacity-[0.03] pointer-events-none"></div>

    <div class="bg-card-cyber backdrop-blur-lg rounded-xl z-10 p-6 md:p-12 px-4 mx-4 md:mx-24 relative overflow-hidden border border-white/5">
      <div :ref="el => badges[0] = el"
        class="absolute top-4 left-6 text-[10px] font-mono text-galaxy-cyan opacity-70 hidden md:block tracking-widest">
        <span class="inline-block w-2 h-2 rounded-full bg-galaxy-cyan animate-pulse mr-2"></span>
        SYS_REF: 001-ALPHA // TR_CORE
      </div>
      <div :ref="el => badges[1] = el"
        class="absolute bottom-4 right-6 text-[10px] font-mono text-galaxy-cyan opacity-70 hidden md:block tracking-widest">
        STATUS: <span class="text-galaxy-cyan animate-pulse">ONLINE</span>
      </div>

      <div class="flex flex-col items-center md:items-start gap-6 md:gap-8 max-w-7xl mx-auto relative z-20">
        <div class="flex-shrink-0 w-full text-center md:text-left">
          <SectionTitle ref="titleRef" text="/ About" />
        </div>

        <div class="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 max-w-7xl px-0 md:px-10 mx-auto">
          <CyberProfileImage ref="profileImgRef" src="/images/profil.jpg" class="hidden md:block" />

          <div ref="textContent" class="flex-1 min-w-0 space-y-6 font-sans font-light text-center md:text-left">
            <blockquote
              class="text-md md:text-lg text-white/80 leading-relaxed text-center md:text-justify relative border-l-0 md:border-l-2 md:pl-6 border-galaxy-cyan/30">
              <span class="text-galaxy-cyan font-mono opacity-50 text-2xl">“</span>
              {{ desc }}
              <span class="text-galaxy-cyan ml-2 font-mono opacity-50 text-2xl">”</span>
            </blockquote>

            <p
              class="text-[10px] md:text-sm uppercase tracking-[0.2em] text-white/50 font-mono pt-4 border-t border-white/5">
              // <span class="text-glow-mid">Currently_working:</span> intern fullstack developer at Hospital
            </p>

            <div class="flex flex-wrap justify-center md:justify-start gap-4">
              <Button color="outline" size="sm" icon="download" @click="downloadCV">See CV</Button>
              <Button v-if="githubLink" color="outline" size="sm" :icon="['fab', 'github']"
                @click="openLink(githubLink)">GitHub</Button>
              <Button v-if="linkedinLink" color="outline" size="sm" :icon="['fab', 'linkedin-in']"
                @click="openLink(linkedinLink)">LinkedIn</Button>
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
import CyberProfileImage from '@/components/ui/CyberProfileImage.vue';
import SectionTitle from '@/components/ui/SectionTitle.vue';
import { downloadCV, openLink } from '@/components/composables/useExternalAction';
import { supabase } from '@/lib/supabase';

gsap.registerPlugin(ScrollTrigger);

const sectionContainer = ref(null);
const titleRef = ref(null);
const profileImgRef = ref(null);
const textContent = ref(null);
const badges = ref([]);

const githubLink = ref('https://github.com/taufiqrhmd');
const linkedinLink = ref('https://linkedin.com/in/mohamad-taufiq-rahmadi');
const desc = ref(`Taufiq Rahmadi is a freelance fullstack developer with 2.5+ years of experience crafting responsive, 
high-performance web and mobile applications—where elegant UI/UX design meets robust technical implementation. 
Specializing in modern stacks, he builds digital products that are not only functional but deeply intuitive, 
leveraging interactive animations, thoughtful micro-interactions, and seamless user flows to create what he calls 
invisible technology: solutions that assist without distraction and empower without complexity. Guided by a strong 
commitment to quality, maintainability, and continuous innovation, Taufiq approaches every project as an opportunity to 
engineer meaningful, human-centered experiences—where code, design, and purpose aligns.`);

onMounted(async () => {
  // 1. Fetch Social Links
  const { data } = await supabase.from('profiles').select('github_url, linkedin_url').single();
  if (data) {
    githubLink.value = data.github_url || githubLink.value;
    linkedinLink.value = data.linkedin_url || linkedinLink.value;
  }

  // 2. Setup GSAP Timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionContainer.value,
      start: "top 75%",
      toggleActions: "play none none none"
    }
  });

  tl.to(sectionContainer.value, { opacity: 1, duration: 0.1, repeat: 2, yoyo: true })
    .to(sectionContainer.value, { opacity: 1, duration: 0.3 })
    .from(titleRef.value.$el || titleRef.value, { x: -20, opacity: 0, duration: 0.8, ease: "power4.out" }, "-=0.2")
    .from(profileImgRef.value.$el || profileImgRef.value, { scale: 0.9, opacity: 0, duration: 1, ease: "back.out(1.2)" }, "-=0.5")
    .from(textContent.value.children, { y: 20, opacity: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }, "-=0.7")
    .from(badges.value, { opacity: 0, y: (i) => i === 0 ? -10 : 10, duration: 0.5, stagger: 0.1 }, "-=0.3");
});
</script>


<style scoped>
.bg-card-cyber {
  background: linear-gradient(145deg, rgba(10, 8, 20, 0.7), rgba(18, 15, 30, 0.9));
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05), 0 10px 30px -10px rgba(0, 0, 0, 0.6);
}

.bg-scanlines-global {
  background: linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.05) 50%);
  background-size: 100% 4px;
}
</style>