<template>
    <section id="experience" class="py-20 px-4 relative overflow-hidden bg-galaxy-dark">
        <div class="max-w-7xl mx-auto mt-2 relative z-10">

            <SectionTitle text="My Journey" class="opacity-100 text-center text-4xl md:text-5xl lg:text-6xl" />

            <p ref="headerSub"
                class="text-galaxy-text opacity-0 text-center font-sans mb-16 max-w-2xl mx-auto translate-y-4 mt-2">
                From intensive bootcamp to real-world product development — each step shaped how I build impactful
                digital experiences.
            </p>

            <div v-if="!isLoading" class="relative" ref="timelineContainer">
                <div class="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-[1px] bg-white/10"></div>

                <div ref="lightBeam" class="hidden md:block absolute left-1/2 -translate-x-1/2 z-10 lightbeam"></div>

                <div v-for="(exp, index) in experiences" :key="exp.id" :ref="el => setItemContainerRef(el, index)"
                    class="relative flex flex-col md:flex-row items-center mb-6" :class="[
                        'relative flex flex-col md:flex-row items-center',
                        index !== experiences.length - 1 ? 'mb-12 md:mb-20' : 'mb-0',
                        index % 2 === 0 ? 'md:flex-row-reverse' : ''
                    ]">

                    <ExperienceCard :exp="exp" :is-reversed="index % 2 === 0" />

                    <div class="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20 items-center justify-center">
                        <div class="timeline-dot w-4 h-4 rounded-full border-2 bg-gray-900" :class="{
                            'border-blue-500': exp.type === 'bootcamp',
                            'border-purple-500': exp.type === 'internship',
                            'border-cyan-400 animate-pulse': exp.type === 'current',
                        }"></div>
                    </div>

                    <div class="w-full md:w-[45%] mt-4 md:mt-0"
                        :class="index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'">
                        <span
                            class="experience-period-badge inline-block px-4 py-1 bg-gray-800/50 rounded-full text-xs font-mono text-white/60 border border-white/5">
                            {{ exp.period }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { supabase } from "@/lib/supabase";
import ExperienceCard from "@/components/ui/ExperienceCard.vue";
import SectionTitle from "@/components/ui/SectionTitle.vue";

gsap.registerPlugin(ScrollTrigger);

const experiences = ref([]);
const isLoading = ref(true);
const timelineContainer = ref(null);
const lightBeam = ref(null);
const headerSub = ref(null);
const itemContainers = ref([]);

const setItemContainerRef = (el, index) => {
    if (el) itemContainers.value[index] = el;
};

async function fetchExperiences() {
    try {
        const { data } = await supabase.from("experiences").select("*").order("sort_order", { ascending: true });
        if (data) experiences.value = data;
        await nextTick();
        setTimeout(() => {
            initAnimations();
            ScrollTrigger.refresh();
        }, 300);
    } finally {
        isLoading.value = false;
    }
}

function initAnimations() {
    // 1. Header & Subtitle
    gsap.to(headerSub.value, {
        opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: headerSub.value, start: "top 85%" }
    });

    // 2. Per-Item Timeline Animation
    itemContainers.value.forEach((container, index) => {
        if (!container) return;
        const card = container.querySelector(".experience-card");
        const period = container.querySelector(".experience-period-badge");
        const dot = container.querySelector(".timeline-dot");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        tl.fromTo([card, dot], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" })
            .fromTo(period, { opacity: 0, x: index % 2 === 0 ? -20 : 20 }, { opacity: 1, x: 0, duration: 0.6 }, "-=0.4");
    });

    // 3. Light Beam Scrub (Desktop)
    if (window.innerWidth >= 768 && lightBeam.value) {
        gsap.to(lightBeam.value, {
            y: () => timelineContainer.value.scrollHeight - 100,
            ease: "none",
            scrollTrigger: {
                trigger: timelineContainer.value,
                start: "top 20%",
                end: "bottom 80%",
                scrub: 0.5,
            },
        });
    }
}

onMounted(fetchExperiences);
onUnmounted(() => ScrollTrigger.getAll().forEach(t => t.kill()));
</script>

<style scoped>
.lightbeam {
    width: 2px;
    height: 100px;
    background: linear-gradient(to bottom, transparent, #38bdf8, transparent);
    box-shadow: 0 0 15px #38bdf8;
}
</style>