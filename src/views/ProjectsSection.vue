<template>
  <section class="relative overflow-visible bg-galaxy-dark">
    <Teleport to="body">
      <Transition name="modal-fade">
        <ProjectModal v-if="showModal" :key="selectedProject?.id" :project="selectedProject" :details="selectedDetails"
          @close="closeModal" />
      </Transition>
    </Teleport>

    <div id="projects" ref="scrollSection" class="flex items-start min-h-screen pt-16 md:pt-[92px]">
      <div class="w-full">
        <h2 ref="projectHeading"
          class="font-title text-3xl md:text-5xl italic text-center mb-6 md:mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent opacity-0 translate-y-10">
          Featured Projects
        </h2>

        <div v-if="!isLoading" ref="carouselWrapper" class="flex flex-nowrap gap-6 md:gap-10 px-[10vw]">
          <div v-for="project in supabaseProjects" :key="project.id"
            class="project-card shrink-0 w-[85vw] md:w-[70vw] lg:w-[55vw] h-[60vh] md:h-[70vh] relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900 opacity-0 translate-y-20">
            <img :src="project.image_url" :alt="project.title" class="w-full h-full object-cover" />

            <div
              class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col items-center justify-end pb-8 md:pb-12 px-6 text-white md:opacity-0 md:hover:opacity-100 transition-opacity duration-500 text-center">
              <h3 class="text-xl md:text-3xl font-bold mb-2">{{ project.title }}</h3>
              <p class="text-xs md:text-sm mb-5 text-gray-300 max-w-md line-clamp-3 md:line-clamp-none">
                {{ project.subtitle }}
              </p>

              <Button color="galaxy" size="sm" @click="openDetail(project)"
                class="px-5 py-2 md:px-6 md:py-2 text-black rounded-full font-bold">
                View Details
              </Button>
            </div>
          </div>
        </div>

        <div v-else class="text-white text-center text-xl py-20 font-mono animate-pulse">
          // INITIALIZING_PROJECT_DATA...
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, onUnmounted, nextTick } from 'vue'
import { supabase } from '@/lib/supabase'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import ProjectModal from '@/components/ui/ProjectModal.vue'
import Button from '@/components/ui/VButton.vue'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const scrollSection = ref(null)
const carouselWrapper = ref(null)
const projectHeading = ref(null)
let ctx = null

const supabaseProjects = ref([])
const isLoading = ref(true)

const showModal = ref(false)
const selectedProject = ref(null)
const selectedDetails = ref(null)

const getSupabaseData = async () => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('id', { ascending: true })

    if (!error) {
      supabaseProjects.value = data
    }
  } catch (err) {
    console.error('Gagal ambil data:', err)
  } finally {
    isLoading.value = false
  }
}

const openDetail = async (project) => {
  const smoother = ScrollSmoother.get()
  if (smoother) {
    const scrollPos = smoother.scrollTop()
    smoother.paused(true)
    document.body.setAttribute('data-last-pos', scrollPos.toString())
  }
  const { data, error } = await supabase
    .from('project_details')
    .select('*')
    .eq('project_id', project.id)
    .single()
  if (!error && data) {
    selectedDetails.value = data
    selectedProject.value = project
    showModal.value = true
    document.body.style.overflow = 'hidden'
  } else if (smoother) {
    smoother.paused(false)
  }
}

const closeModal = async () => {
  showModal.value = false
  await nextTick()
  const smoother = ScrollSmoother.get()
  const lastPos = document.body.getAttribute('data-last-pos')
  if (smoother) {
    if (lastPos) smoother.scrollTop(parseInt(lastPos, 10))
    smoother.paused(false)
    ScrollTrigger.refresh()
  }
  document.body.style.overflow = ''
}

onMounted(async () => {
  await getSupabaseData()
  await nextTick()

  if (carouselWrapper.value) {
    ctx = gsap.context(() => {
      // Animasi judul
      gsap.to(projectHeading.value, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: scrollSection.value,
          start: 'top 80%',
        },
      })

      // Animasi card masuk
      gsap.to('.project-card', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: scrollSection.value,
          start: 'top 70%',
        },
      })

      // Horizontal scroll carousel
      const getScrollAmount = () => {
        const wrapper = carouselWrapper.value
        return wrapper ? wrapper.scrollWidth - window.innerWidth + window.innerWidth * 0.2 : 0
      }

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
      })
    }, scrollSection.value)
  }
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
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

section.relative.overflow-visible.bg-galaxy-dark {
  z-index: 1;
}

.project-card {
  will-change: transform, opacity;
}
</style>