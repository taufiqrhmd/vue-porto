<template>
  <section id="contact" class="py-20 px-6 bg-galaxy-dark overflow-hidden">
    <div class="max-w-7xl mx-auto z-10">
      <div class="contact-header text-center mb-16">
        <SectionTitle text="Let's Talk." class="text-4xl md:5xl lg:text-7xl" />
        <p class="text-white/60 text-lg max-w-2xl mx-auto font-sans mt-2">
          Have an exciting idea? Let's make it a reality through great collaboration.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div class="contact-info space-y-8">
          <div class="mb-4">
            <p class="font-mono text-md text-galaxy-text opacity-90">
              👋 I'm all ears.
              <span class="text-galaxy-cyan font-medium">Drop a message</span> —
              let’s turn your vision into code.
            </p>
            <div class="mt-3 h-px w-28 bg-gradient-to-r from-galaxy-cyan to-transparent opacity-50"></div>
          </div>

          <ContactInfoItem label="Email" value="taufiqrhmd@gmail.com">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </template>
          </ContactInfoItem>

          <ContactInfoItem label="Location" value="Jawa Timur, Indonesia" icon-color="text-galaxy-magenta"
            border-color="group-hover:border-galaxy-magenta">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </template>
          </ContactInfoItem>

          <div class="pt-2 flex flex-wrap gap-3">
            <BaseButton v-if="githubLink" color="outline" size="sm" @click="openLink(githubLink)">GitHub</BaseButton>
            <BaseButton v-if="linkedinLink" color="outline" size="sm" @click="openLink(linkedinLink)">LinkedIn
            </BaseButton>
            <BaseButton v-if="instagramLink" color="outline" size="sm" @click="openLink(instagramLink)">Instagram
            </BaseButton>
          </div>
        </div>

        <div class="contact-form-container z-10">
          <form @submit.prevent="sendViaWhatsApp"
            class="bg-gray-900/40 p-10 rounded-3xl border border-gray-800 backdrop-blur-lg shadow-2xl">
            <div class="space-y-5">
              <div class="relative text-white">
                <input v-model="formData.name" type="text" placeholder="Your Name" required
                  class="w-full bg-black/50 border border-gray-700 rounded-xl py-4 px-5 focus:outline-none focus:border-galaxy-cyan transition-all placeholder:text-gray-600" />
              </div>
              <div class="relative text-white">
                <input v-model="formData.email" type="email" placeholder="Email" required
                  class="w-full bg-black/50 border border-gray-700 rounded-xl py-4 px-5 focus:outline-none focus:border-galaxy-cyan transition-all placeholder:text-gray-600" />
              </div>
              <div class="relative text-white">
                <textarea v-model="formData.message" placeholder="Your Message" rows="4" required
                  class="w-full bg-black/50 border border-gray-700 rounded-xl py-4 px-5 focus:outline-none focus:border-galaxy-cyan transition-all placeholder:text-gray-600"></textarea>
              </div>
              <BaseButton :icon="['fas', 'paper-plane']" color="outline" size="lg" class="w-full py-4 rounded-xl"
                :loading="isSending">
                Send via WhatsApp
              </BaseButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <footer class="max-w-7xl mx-auto px-4 border-t border-gray-700 py-6">
    <div class="text-center text-white/20 text-xs tracking-[0.2em] uppercase">
      &copy; 2026 T-Programmer. Crafting with Passion.
    </div>
  </footer>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supabase } from '@/lib/supabase';
import BaseButton from '@/components/ui/VButton.vue';
import SectionTitle from '@/components/ui/SectionTitle.vue';
import ContactInfoItem from '@/components/ui/ContactInfoItem.vue';

gsap.registerPlugin(ScrollTrigger);

// Social Links State
const githubLink = ref('https://github.com/taufiqrhmd');
const linkedinLink = ref('https://linkedin.com/in/mohamad-taufiq-rahmadi');
const instagramLink = ref('https://www.instagram.com/taufiqrhmd_');

const isSending = ref(false);
const formData = reactive({ name: '', email: '', message: '' });

const openLink = (url) => url && window.open(url, '_blank', 'noopener,noreferrer');

onMounted(async () => {
  // Fetch Social Links
  const { data } = await supabase.from('profiles').select('github_url, linkedin_url, instagram_url').single();
  if (data) {
    githubLink.value = data.github_url || githubLink.value;
    linkedinLink.value = data.linkedin_url || linkedinLink.value;
    instagramLink.value = data.instagram_url || instagramLink.value;
  }

  // Entrance Animation
  const tl = gsap.timeline({
    scrollTrigger: { trigger: "#contact", start: "top center" }
  });

  tl.from(".contact-header", { y: 50, opacity: 0, duration: 1, ease: "power3.out" })
    .from(".contact-info", { x: -50, opacity: 0, duration: 0.8 }, "-=0.5")
    .from(".contact-form-container", { x: 50, opacity: 0, duration: 0.8 }, "-=0.8");
});

const sendViaWhatsApp = () => {
  isSending.value = true;
  const message = `Hello, I'm ${formData.name}.\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
  window.open(`https://wa.me/6287841656134?text=${encodeURIComponent(message)}`, '_blank');

  // Reset Form
  Object.assign(formData, { name: '', email: '', message: '' });
  isSending.value = false;
};
</script>