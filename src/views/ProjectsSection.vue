<template>
  <section class="relative overflow-hidden">
    <Teleport to="body">
      <Transition name="modal-fade">
        <ProjectModal v-if="showModal" :key="selectedProject?.id" :project="selectedProject" :details="selectedDetails"
          @close="closeModal" />
      </Transition>
    </Teleport>

    <div id="projects" ref="scrollSection" class="flex items-start h-screen pt-20">
      <div class="w-full">
        <h2 ref="projectHeading"
          class="font-title text-5xl italic text-center mt-4 mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent opacity-0">
          Featured Projects
        </h2>

        <div v-if="!isLoading" ref="carouselWrapper" class="flex flex-nowrap gap-10 px-[7vw]">
          <div v-for="project in supabaseProjects" :key="project.id"
            class="project-card shrink-0 w-[80vw] md:w-[70vw] lg:w-[60vw] h-[72vh] relative rounded-2xl overflow-hidden shadow-2xl bg-gray-800 opacity-0 translate-y-20">
            <img :src="project.image_url" class="w-full h-full object-cover" />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/90 flex flex-col items-center justify-end pb-12 px-6 text-white opacity-0 hover:opacity-100 transition-opacity duration-500 text-center">
              <h3 class="text-3xl font-bold mb-3">{{ project.title }}</h3>
              <p class="text-sm mb-5 text-gray-300 max-w-md">{{ project.subtitle }}</p>

              <Button color="galaxy" size="md" @click="openDetail(project)"
                class="px-6 py-2 text-black rounded-full font-bold transition-colors">
                View Details
              </Button>
            </div>
          </div>
        </div>

        <div v-else class="text-white text-center text-xl py-20">
          Loading Data dari Supabase...
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
import Button from '@/components/ui/VButton.vue';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const scrollSection = ref(null);
const carouselWrapper = ref(null);
const projectHeading = ref(null); // Ref baru untuk judul
let ctx;
const supabaseProjects = ref([]);
const isLoading = ref(true);

const showModal = ref(false);
const selectedProject = ref(null);
const selectedDetails = ref(null);

const getSupabaseData = async () => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('id', { ascending: true });

    if (!error) {
      supabaseProjects.value = data;
    }
  } catch (err) {
    console.error("Gagal ambil data:", err);
  } finally {
    isLoading.value = false;
  };
}

// Logika Modal (tetap sama) ...
const openDetail = async (project) => {
  const smoother = ScrollSmoother.get();
  if (smoother) {
    const scrollPos = smoother.scrollTop();
    smoother.paused(true);
    document.body.setAttribute('data-last-pos', scrollPos);
  }
  const { data, error } = await supabase.from('project_details').select('*').eq('project_id', project.id).single();
  if (!error && data) {
    selectedDetails.value = data;
    selectedProject.value = project;
    showModal.value = true;
    document.body.style.overflow = 'hidden';
  } else if (smoother) smoother.paused(false);
};

const closeModal = async () => {
  showModal.value = false;
  await nextTick();
  const smoother = ScrollSmoother.get();
  const lastPos = document.body.getAttribute('data-last-pos');
  if (smoother) {
    if (lastPos) smoother.scrollTop(parseInt(lastPos));
    smoother.paused(false);
    ScrollTrigger.refresh();
  }
  document.body.style.overflow = '';
};

onMounted(async () => {
  await getSupabaseData();
  await nextTick();

  if (carouselWrapper.value) {
    const scrollWidth = carouselWrapper.value.scrollWidth;
    const viewportWidth = window.innerWidth;
    const amountToScroll = scrollWidth - viewportWidth + (viewportWidth * 0.1);

    ctx = gsap.context(() => {
      // 1. ANIMASI MASUK (ENTRANCE)
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollSection.value,
          start: "top center", // Mulai animasi saat section mendekati layar
          toggleActions: "play none none none"
        }
      });

      entranceTl
        .to(projectHeading.value, { 
          opacity: 1, 
          y: -20, 
          duration: 1, 
          ease: "power4.out" 
        })
        .to(".project-card", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15, // Muncul satu persatu
          ease: "back.out(1.2)"
        }, "-=0.6");

      // 2. ANIMASI HORIZONTAL SCROLL (PINNING)
      gsap.to(carouselWrapper.value, {
        x: () => -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: scrollSection.value,
          start: "top top",
          end: () => `+=${amountToScroll}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          pinSpacing: true,
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
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.4s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* State awal untuk animasi GSAP */
.project-card {
  will-change: transform, opacity;
}
</style>