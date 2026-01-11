<template>
    <section id="experience" class="py-20 px-4 relative overflow-hidden">
        <div class="max-w-7xl mx-auto relative z-10 mt-2">
            <h2 ref="headerTitle"
                class="text-4xl md:text-5xl font-bold font-title italic text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-glow-start via-glow-mid to-glow-end opacity-0">
                My Journey
            </h2>
            <p ref="headerSub" class="text-galaxy-text opacity-0 text-center font-sans mb-16 max-w-2xl mx-auto">
                From intensive bootcamp to real-world product development — each step shaped how I build impactful
                digital experiences.
            </p>

            <div v-if="isLoading" class="flex justify-center py-20">
                <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
            </div>

            <div v-else class="relative" ref="timelineContainer">
                <div class="hidden md:block absolute left-1/2 top-0 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500/10 via-purple-500/10 to-transparent rounded-full z-10">
                </div>

                <div ref="lightBeam"
                    class="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-15 opacity-0 lightbeam"></div>

                <div v-for="(exp, index) in experiences" :key="exp.id" :ref="el => setItemContainerRef(el, index)"
                    class="relative flex flex-col md:flex-row items-center mb-12 md:mb-16"
                    :class="index % 2 === 0 ? 'md:flex-row-reverse' : ''">
                    <!-- Card -->
                    <div class="w-full md:w-[45%] p-6 rounded-2xl border bg-gray-800/40 backdrop-blur-sm card-hover z-20 animate-target"
                        :class="[
                            exp.type === 'current'
                                ? 'border-blue-500/50 ring-1 ring-blue-500/30'
                                : 'border-gray-700',
                            index % 2 === 0 ? 'md:ml-auto md:mr-2' : 'md:mr-auto md:ml-2'
                        ]">
                        <div class="flex items-start gap-4">
                            <span class="px-3 py-1 text-xs font-bold rounded-full" :class="{
                                'bg-blue-500/20 text-blue-300 border border-blue-500/30': exp.type === 'bootcamp',
                                'bg-purple-500/20 text-purple-300 border border-purple-500/30': exp.type === 'internship',
                                'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 animate-pulse':
                                    exp.type === 'current',
                            }">
                                {{ exp.type.toUpperCase() }}
                            </span>
                            <div class="flex-1">
                                <h3 class="text-xl font-bold text-white">{{ exp.title }}</h3>
                                <p class="text-blue-400 font-medium">{{ exp.company }}</p>
                                <p class="text-gray-400 text-sm mt-1">{{ exp.location }}</p>
                            </div>
                        </div>

                        <p class="mt-4 text-gray-300 leading-relaxed text-sm md:text-base">
                            {{ exp.description }}
                        </p>

                        <div class="mt-4 flex flex-wrap gap-2">
                            <span v-for="tech in exp.tech" :key="tech"
                                class="px-3 py-1 bg-gray-700/50 rounded-lg text-xs text-gray-300 border border-gray-600">
                                {{ tech }}
                            </span>
                        </div>
                    </div>

                    <!-- Timeline dot (desktop only) -->
                    <div
                        class="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-20 items-center justify-center">
                        <div class="timeline-dot w-6 h-6 rounded-full border-4 flex items-center justify-center" :class="{
                            'border-blue-500 bg-blue-600': exp.type === 'bootcamp',
                            'border-purple-500 bg-purple-600': exp.type === 'internship',
                            'border-cyan-400 bg-cyan-500 animate-pulse': exp.type === 'current',
                        }">
                            <div class="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                    </div>

                    <!-- Period badge -->
                    <div class="w-full md:w-[45%] mt-4 md:mt-0 text-center experience-period-container "
                        :class="index % 2 === 0 ? 'md:text-end md:pr-12' : 'md:text-start md:pl-12'">
                        <span
                            class="experience-period-badge animate-target inline-block px-4 py-2 bg-gray-900/60 backdrop-blur-sm rounded-full text-sm font-mono text-gray-300 border border-gray-700 shadow">
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

gsap.registerPlugin(ScrollTrigger);

// Refs
const experiences = ref([]);
const isLoading = ref(true);
const timelineContainer = ref(null);
const lightBeam = ref(null);
const headerTitle = ref(null);
const headerSub = ref(null);
const itemContainers = ref([]);

// Cleanup array for ScrollTriggers
let journeyTriggers = [];

// Fetch data
async function fetchExperiences() {
    try {
        isLoading.value = true;
        const { data, error } = await supabase
            .from("experiences")
            .select("*")
            .order("sort_order", { ascending: true });

        if (error) throw error;
        experiences.value = data;

        await nextTick();
        // Delay kecil untuk memastikan DOM benar-benar siap
        setTimeout(() => {
            initAnimations();
            ScrollTrigger.refresh();
        }, 300);
    } catch (err) {
        console.error("Error fetching experiences:", err);
    } finally {
        isLoading.value = false;
    }
}

// Set ref for each item container
const setItemContainerRef = (el, index) => {
    if (el) itemContainers.value[index] = el;
};

// Initialize all animations
function initAnimations() {
    // Clean up previous triggers
    journeyTriggers.forEach((t) => t.kill());
    journeyTriggers = [];

    // Header animation
    if (headerTitle.value && headerSub.value) {
        const headerTl = gsap.timeline({
            scrollTrigger: {
                trigger: headerTitle.value,
                start: "top center",
                toggleActions: "play none none none",
            },
        });

        headerTl
            .to(headerTitle.value, {
                opacity: 1,
                y: -10,
                duration: 0.8,
                ease: "power3.out",
            })
            .to(
                headerSub.value,
                {
                    opacity: 1,
                    y: -5,
                    duration: 0.8,
                    ease: "power3.out",
                },
                "-=0.4"
            );
    }

    // Per-item animation: card → period
    itemContainers.value.forEach((container, index) => {
        if (!container) return;

        const card = container.querySelector(".card-hover");
        const period = container.querySelector(".experience-period-badge");
        const dot = container.querySelector(".timeline-dot");

        if (!card || !period) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top 80%",
                toggleActions: "play none none none",
                once: true,
            },
        });

        // === 1. Card & Dot muncul BERSAMAAN (tanpa delay) ===
        tl.fromTo(
            card,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
            }
        );

        if (dot) {
            // Dot ikut muncul bersama card, tapi dengan sedikit lift
            tl.fromTo(
                dot,
                { opacity: 0, scale: 0.6, y: 4 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "elastic.out(1, 0.3)", // hindari "back.out" agar tidak pop
                },
                0 // mulai di waktu 0, bersamaan dengan card
            );
        }

        // === 2. Period muncul setelah card stabil ===
        const isReversed = index % 2 === 0;
        const startX = isReversed ? -25 : 25;

        tl.fromTo(
            period,
            { opacity: 0, x: startX, y: 5 },
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 1.2,
                ease: "power2.out",
            },
            "-=0.2" // mulai sedikit sebelum card selesai → terasa seamless
        );

        if (tl.scrollTrigger) journeyTriggers.push(tl.scrollTrigger);
    });;;

    // Light beam (desktop only)
    if (
        window.innerWidth >= 768 &&
        lightBeam.value &&
        timelineContainer.value
    ) {
        gsap.to(lightBeam.value, {
            opacity: 1,
            scrollTrigger: {
                trigger: timelineContainer.value,
                start: "top 80%",
                once: true,
            },
        });

        gsap.to(lightBeam.value, {
            y: () => timelineContainer.value.scrollHeight - 80,
            ease: "none",
            scrollTrigger: {
                trigger: timelineContainer.value,
                start: "top 20%",
                end: "bottom 80%",
                scrub: 1,
            },
        });
    }
}

// Lifecycle
onMounted(() => {
    fetchExperiences();

    // Optional: refresh on resize
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    onUnmounted(() => {
        window.removeEventListener("resize", handleResize);
        journeyTriggers.forEach((t) => t.kill());
        ScrollTrigger.getAll().forEach((st) => st.kill(false));
    });
});
</script>

<style scoped>
.animate-target {
    opacity: 0;
}

.lightbeam {
    width: 4px;
    height: 100px;
    top: 0;
    background: linear-gradient(to bottom, transparent, #38bdf8, transparent);
    box-shadow: 0 0 20px rgba(56, 189, 248, 0.6);
    filter: blur(1px);
    border-radius: 999px;
}

.card-hover {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
    transform: translateY(-8px);
    background-color: rgba(31, 41, 55, 0.7);
    border-color: rgba(59, 130, 246, 0.4);
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
}
</style>