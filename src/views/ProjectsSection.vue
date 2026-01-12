<template>
  <section class="relative overflow-visible bg-galaxy-dark">
    <Teleport to="body">
      <Transition name="modal-fade">
        <ProjectModal v-if="showModal" :project="selectedProject" :details="selectedDetails" @close="closeModal" />
      </Transition>
    </Teleport>

    <div id="projects" ref="scrollSection" class="flex items-start min-h-screen pt-16 md:pt-[92px] z-10">
      <div class="w-full">
        <SectionTitle 
        ref="projectHeading" 
          text="Featured Projects" 
          class="mb-6 md:mb-10 text-4xl md:text-5xl lg:text-6xl opacity-0 translate-y-10 block text-center"
        />

        <div v-if="!isLoading" ref="carouselWrapper" class="flex flex-nowrap gap-6 md:gap-10 px-[10vw]">
          <ProjectCard 
            v-for="project in supabaseProjects" 
            :key="project.id" 
            :project="project" 
            @view-detail="openDetail"
            />
        </div>

        <div v-else class="text-galaxy-cyan text-center text-xl py-20 font-mono animate-pulse tracking-widest">
          // INITIALIZING_PROJECT_DATA...
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, onUnmounted, nextTick } from 'vue';
import { supabase } from '@/lib/supabase';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import ProjectModal from '@/components/ui/ProjectModal.vue';
import ProjectCard from '@/components/ui/ProjectCard.vue';
import SectionTitle from '@/components/ui/SectionTitle.vue'; // Gunakan komponen judul yang sudah kita buat sebelumnya

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const scrollSection = ref(null);
const carouselWrapper = ref(null);
const projectHeading = ref(null);
const supabaseProjects = ref([]);
const isLoading = ref(true);
const showModal = ref(false);
const selectedProject = ref(null);
const selectedDetails = ref(null);
let ctx = null;

// Logic Fetch Data
const getSupabaseData = async () => {
  try {
    const { data } = await supabase.from('projects').select('*').order('id', { ascending: true });
    if (data) supabaseProjects.value = data;
  } catch (err) {
    console.error('Gagal ambil data:', err);
  } finally {
    isLoading.value = false;
  }
};

// Modal Logic (Tetap di parent agar koordinat scroll aman)
const openDetail = async (project) => {
  const smoother = ScrollSmoother.get();
  if (smoother) {
    document.body.setAttribute('data-last-pos', smoother.scrollTop().toString());
    smoother.paused(true);
  }
  
  const { data } = await supabase.from('project_details').select('*').eq('project_id', project.id).single();
  if (data) {
    selectedDetails.value = data;
    selectedProject.value = project;
    showModal.value = true;
    document.body.style.overflow = 'hidden';
  } else if (smoother) {
    smoother.paused(false);
  }
};

const closeModal = async () => {
  showModal.value = false;
  await nextTick();
  const smoother = ScrollSmoother.get();
  const lastPos = document.body.getAttribute('data-last-pos');
  if (smoother) {
    if (lastPos) smoother.scrollTop(parseInt(lastPos, 10));
    smoother.paused(false);
    ScrollTrigger.refresh();
  }
  document.body.style.overflow = '';
};

onMounted(async () => {
  await getSupabaseData();
  await nextTick(); // Krusial: Tunggu DOM render agar scrollWidth terbaca

  if (carouselWrapper.value) {
    ctx = gsap.context(() => {
      // 1. Entrance Animasi Judul & Card
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollSection.value,
          start: 'top 80%',
        }
      });

      entranceTl.to(projectHeading.value.$el || projectHeading.value, { opacity: 1, y: 0, duration: 1 })
                .to('.project-card', { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, "-=0.5");

      // 2. Horizontal Scroll Logic
      const getScrollAmount = () => {
        const wrapper = carouselWrapper.value;
        return wrapper ? wrapper.scrollWidth - window.innerWidth + (window.innerWidth * 0.2) : 0;
      };

      gsap.to(carouselWrapper.value, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: scrollSection.value,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, scrollSection.value);
  }
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<style scoped>
  .modal-fade-enter-active, .modal-fade-leave-active { transition: all 0.4s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; transform: scale(0.9); }
</style>