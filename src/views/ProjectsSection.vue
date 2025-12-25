<template>
  <section ref="scrollSection" class="relative overflow-hidden">
    <Teleport to="body">
      <Transition name="modal-fade">
        <ProjectModal v-if="showModal" :key="selectedProject?.id" :project="selectedProject" :details="selectedDetails"
          @close="closeModal" />
      </Transition>
    </Teleport>
    <div class="flex items-start h-screen pt-20">
      <div id="projects" class="w-full">
        <h2
          class="font-title text-4xl italic text-center mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Featured Projects
        </h2>

        <div v-if="!isLoading" ref="carouselWrapper" class="flex flex-nowrap gap-10 px-[5vw]">

          <div v-for="project in supabaseProjects" :key="project.id"
            class="project-card shrink-0 w-[80vw] md:w-[70vw] lg:w-[60vw] h-[72vh] relative rounded-2xl overflow-hidden shadow-2xl bg-gray-800">
            <img :src="project.image_url" class="w-full h-full object-cover" />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/90 flex flex-col items-center justify-end pb-12 px-6 text-white opacity-0 hover:opacity-100 transition-opacity duration-500 text-center">
              <h3 class="text-3xl font-bold mb-3">{{ project.title }}</h3>
              <p class="text-sm mb-5 text-gray-300 max-w-md">{{ project.subtitle }}</p>

              <button @click="openDetail(project)"
                class="px-6 py-2 bg-white text-black rounded-full font-bold hover:bg-blue-400 transition-colors">
                View Details
              </button>
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

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const scrollSection = ref(null);
const carouselWrapper = ref(null);
let ctx;
const supabaseProjects = ref([]);
const isLoading = ref(true);

const showModal = ref(false);
const selectedProject = ref(null);
const selectedDetails = ref(null);

onUnmounted(() => {
  if (ctx) ctx.revert();
});

const getSupabaseData = async () => {
  try {
    const { data, error } = await supabase
      .from('Projects')
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

const openDetail = async (project) => {
  const smoother = ScrollSmoother.get();
  
  // 1. Kunci posisi SEKARANG juga (sebelum fetch atau modal muncul)
  if (smoother) {
    // Simpan posisi tepatnya
    const scrollPos = smoother.scrollTop();
    smoother.paused(true);
    // Simpan ke memory agar bisa dipaksa balik ke sini jika melompat
    document.body.setAttribute('data-last-pos', scrollPos);
  }

  // 2. Baru lakukan Fetch Supabase
  const { data, error } = await supabase
    .from('Project_Details')
    .select('*')
    .eq('project_id', project.id)
    .single();

  if (!error && data) {
    selectedDetails.value = data;
    selectedProject.value = project;
    showModal.value = true;
    document.body.style.overflow = 'hidden';
  } else {
    // Jika error, lepas kembali pause-nya
    if (smoother) smoother.paused(false);
  }
};

const closeModal = async () => {
  showModal.value = false;
  await nextTick();

  const smoother = ScrollSmoother.get();
  const lastPos = document.body.getAttribute('data-last-pos');

  if (smoother) {
    // Kembalikan ke posisi yang tepat sebelum resume
    if (lastPos) smoother.scrollTop(parseInt(lastPos));
    
    // Resume smoother
    smoother.paused(false);
    
    // Refresh HANYA ScrollTrigger ini agar tidak lompat ke awal halaman
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

    let ctx = gsap.context(() => {
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

    onUnmounted(() => {
      ctx.revert();
    });
  }
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
</style>