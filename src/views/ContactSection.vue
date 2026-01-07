<template>
  <section id="contact" class="py-20 px-6 text-white overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <div class="contact-header text-center mb-20">
        <h2
          class="font-title italic text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-glow-start via-glow-mid to-glow-end bg-clip-text text-transparent">
          Let's Talk.
        </h2>
        <p class="text-galaxy-text opacity-80 text-lg max-w-2xl mx-auto font-sans">
          Have an exciting idea? Let's make it a reality through great collaboration.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div class="contact-info space-y-12">
          <div class="brand-info">
            <span class="text-3xl font-bold tracking-tighter italic">T<span
                class="text-galaxy-blue underline">-PROGRAMMER</span></span>
            <p class="text-galaxy-text opacity-80 mt-2 font-light text-lg">Building meaningful and impactful digital experiences</p>
          </div>

          <div class="space-y-6">
            <div class="flex items-center space-x-4 group">
              <div
                class="p-4 bg-gray-900 rounded-2xl border border-gray-800 group-hover:border-blue-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p class="font-heading text-sm text-gray-500 uppercase tracking-widest">Email</p>
                <p class="font-sans text-xl font-medium">taufiqrhmd@gmail.com</p>
              </div>
            </div>

            <div class="flex items-center space-x-4 group">
              <div
                class="p-4 bg-gray-900 rounded-2xl border border-gray-800 group-hover:border-purple-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <div>
                <p class="font-heading text-sm text-gray-500 uppercase tracking-widest">Location</p>
                <p class="font-sans text-xl font-medium">Jawa Timur, Indonesia</p>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap gap-3">
            <BaseButton v-if="githubLink" color="outline" size="sm" :icon="['fab', 'github']"
              @click="(e) => { openLink(githubLink); e.currentTarget.blur(); }">
              GitHub
            </BaseButton>

            <BaseButton v-if="linkedinLink" color="outline" size="sm" :icon="['fab', 'linkedin-in']"
              @click="(e) => { openLink(linkedinLink); e.currentTarget.blur(); }">
              LinkedIn
            </BaseButton>

            <BaseButton v-if="instagramLink" color="outline" size="sm" :icon="['fab', 'instagram']"
              @click="(e) => { openLink(instagramLink); e.currentTarget.blur(); }">
              Instagram
            </BaseButton>
          </div>
        </div>

        <div class="contact-form-container">
          <form @submit.prevent="handleSendMessage"
            class="bg-gray-900/40 p-10 rounded-3xl border border-gray-800 backdrop-blur-xl shadow-2xl">
            <div class="space-y-5">
              <div class="relative">
                <input v-model="formData.name" type="text" placeholder="Your Name" required
                  class="w-full bg-black/50 border border-gray-700 rounded-xl py-4 px-5 focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-600" />
              </div>
              <div class="relative">
                <input v-model="formData.email" type="email" placeholder="Email" required
                  class="w-full bg-black/50 border border-gray-700 rounded-xl py-4 px-5 focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-600" />
              </div>
              <div class="relative">
                <textarea v-model="formData.message" placeholder="Your Message" rows="4" required
                  class="w-full bg-black/50 border border-gray-700 rounded-xl py-4 px-5 focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-600"></textarea>
              </div>

              <BaseButton color="outline" size="lg" class="w-full py-4 rounded-xl" :loading="isSending">
                Send
              </BaseButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <footer class="bg-black py-8 border-t border-gray-900">
    <div class="text-center text-gray-600 text-sm tracking-widest uppercase">
      &copy; 2026 T-Programmer. Crafting with Passion.
    </div>
  </footer>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BaseButton from '@/components/ui/VButton.vue';
import { supabase } from '@/lib/supabase';

const openLink = (url) => {
  if (url) window.open(url, '_blank', 'noopener,noreferrer');
};

gsap.registerPlugin(ScrollTrigger);

const githubLink = ref('https://github.com/taufiqrhmd')
const linkedinLink = ref('https://linkedin.com/in/mohamad-taufiq-rahmadi')
const instagramLink = ref('https://www.instagram.com/taufiqrhmd_')

const isSending = ref(false);
const formData = reactive({
  name: '',
  email: '',
  message: ''
});

onMounted(async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('github_url, linkedin_url, instagram_url')
      .single()

    if (data) {
      githubLink.value = data.github_url || githubLink.value
      linkedinLink.value = data.linkedin_url || linkedinLink.value
      instagramLink.value = data.instagram_url || instagramLink.value
    }
    if (error) throw error
  } catch (err) {
    console.error('Koneksi Supabase gagal, menggunakan link default.')
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#contact",
      start: "top center",
    }
  });

  tl.from(".contact-header", { y: 50, opacity: 0, duration: 1, ease: "power3.out" })
    .from(".contact-info", { x: -50, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.5")
    .from(".contact-form-container", { x: 50, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.8")
});

const handleSendMessage = async () => {
  isSending.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    formData.name = '';
    formData.email = '';
    formData.message = '';
    alert('Terima kasih! Pesan Anda telah berhasil terkirim.');
  } catch (error) {
    alert('Maaf, terjadi kesalahan.');
  } finally {
    isSending.value = false;
  }
};
</script>