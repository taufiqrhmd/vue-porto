<template>
    <section class="py-20 px-4 bg-gradient-to-b from-galaxy-darker to-black relative overflow-hidden">
        <div id="experience" class="max-w-7xl mx-auto relative z-10">
            <h2 ref="headerTitle"
                class="text-4xl md:text-5xl font-bold font-title italic text-center mb-4 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                My Journey
            </h2>
            <p ref="headerSub" class="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
                From intensive bootcamp to real-world product development — each step shaped how I build impactful
                digital experiences.
            </p>

            <div v-if="isLoading" class="flex justify-center py-20">
                <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
            </div>

            <div v-else class="relative" ref="timelineContainer">
                <div
                    class="absolute left-1/2 top-0 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500/10 via-purple-500/10 to-transparent rounded-full z-10">
                </div>

                <div ref="lightBeam" class="absolute left-1/2 transform -translate-x-1/2 z-15 opacity-0 lightbeam">
                </div>

                <div class="space-y-16">
                    <div v-for="(exp, index) in experiences" :key="exp.id" :ref="setItems"
                        class="relative flex flex-col md:flex-row items-center opacity-0 transition-opacity duration-300"
                        :class="index % 2 === 0 ? 'md:flex-row-reverse' : ''">
                        <div class="w-full md:w-[45%] p-6 rounded-2xl border bg-gray-800/40 backdrop-blur-sm card-hover"
                            :class="[
                                exp.type === 'current' ? 'border-blue-500/50 ring-1 ring-blue-500/30' : 'border-gray-700',
                                index % 2 === 0 ? 'md:ml-auto md:mr-8' : 'md:mr-auto md:ml-8'
                            ]">

                            <div class="flex items-start gap-4">
                                <span class="px-3 py-1 text-xs font-bold rounded-full" :class="{
                                    'bg-blue-500/20 text-blue-300 border border-blue-500/30': exp.type === 'bootcamp',
                                    'bg-purple-500/20 text-purple-300 border border-purple-500/30': exp.type === 'internship',
                                    'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 animate-pulse': exp.type === 'current',
                                }">
                                    {{ exp.type.toUpperCase() }}
                                </span>
                                <div class="flex-1">
                                    <h3 class="text-xl font-bold text-white">{{ exp.title }}</h3>
                                    <p class="text-blue-400 font-medium">{{ exp.company }}</p>
                                    <p class="text-gray-400 text-sm mt-1">{{ exp.location }}</p>
                                </div>
                            </div>

                            <p class="mt-4 text-gray-300 leading-relaxed">{{ exp.description }}</p>

                            <div class="mt-4 flex flex-wrap gap-2">
                                <span v-for="tech in exp.tech" :key="tech"
                                    class="px-3 py-1 bg-gray-700/50 rounded-lg text-xs text-gray-300 border border-gray-600">
                                    {{ tech }}
                                </span>
                            </div>
                        </div>

                        <div class="absolute left-1/2 transform -translate-x-1/2 z-20">
                            <div class="w-6 h-6 rounded-full border-4 flex items-center justify-center" :class="{
                                'border-blue-500 bg-blue-600': exp.type === 'bootcamp',
                                'border-purple-500 bg-purple-600': exp.type === 'internship',
                                'border-cyan-400 bg-cyan-500 animate-pulse': exp.type === 'current',
                            }">
                                <div class="w-2 h-2 rounded-full bg-white"></div>
                            </div>
                        </div>

                        <div class="w-full md:w-[60%] mt-4 md:mt-0 text-center"
                            :class="index % 2 === 0 ? 'md:text-end pr-36' : 'md:text-start pl-36'">
                            <span
                                class="inline-block px-4 py-2 bg-gray-900/60 backdrop-blur-sm rounded-full text-sm font-mono text-gray-300 border border-gray-700 shadow">
                                {{ exp.period }}
                            </span>
                        </div>
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
import { supabase } from '@/lib/supabase';

gsap.registerPlugin(ScrollTrigger);

const experiences = ref([]);
const isLoading = ref(true);
const timelineContainer = ref(null);
const lightBeam = ref(null);
const timelineItems = ref([]);
const headerTitle = ref(null);
const headerSub = ref(null);

let journeyTriggers = [];

const setItems = (el) => {
    if (el) timelineItems.value.push(el);
};

async function fetchExperiences() {
    try {
        isLoading.value = true;

        const { data, error } = await supabase
            .from('experiences')
            .select('*')
            .order('sort_order', { ascending: true });

        if (error) throw error;
        experiences.value = data;

        await nextTick();
        setTimeout(() => {
            initAnimations();
            ScrollTrigger.refresh();
        }, 300);
    } catch (err) {
        console.error(err);
    } finally {
        isLoading.value = false;
    }
}

function initAnimations() {
    journeyTriggers.forEach(t => t.kill());
    journeyTriggers = [];

    const headerTl = gsap.timeline({
        scrollTrigger: {
            trigger: headerTitle.value,
            start: "top 90%",
            toggleActions: "play none none none"
        }
    });

    headerTl.to(headerTitle.value, {
        opacity: 1,
        y: -20,
        duration: 0.8,
        ease: "power3.out"
    })
    .to(headerSub.value, {
        opacity: 1,
        y: -10,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.4");

    timelineItems.value.forEach((item) => {
        const anim = gsap.fromTo(item,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                },
            }
        );
        if (anim.scrollTrigger) journeyTriggers.push(anim.scrollTrigger);
    });

    if (lightBeam.value && timelineContainer.value) {
        gsap.to(lightBeam.value, {
            opacity: 1,
            scrollTrigger: {
                trigger: timelineContainer.value,
                start: "top 80%",
                once: true,
            }
        });

        gsap.to(lightBeam.value, {
            y: () => timelineContainer.value.scrollHeight - 50,
            ease: "none",
            scrollTrigger: {
                trigger: timelineContainer.value,
                start: "top 20%",
                end: "bottom 80%",
                scrub: 2,
            }
        });
    }
}

onMounted(() => {
    fetchExperiences();
});

onUnmounted(() => {
    journeyTriggers.forEach(t => t.kill());
});
</script>

<style scoped>
.lightbeam {
    width: 4px;
    height: 80px;
    top: 0;
    background: radial-gradient(circle at center, rgba(56, 189, 248, 0.7), transparent 70%);
    box-shadow: 0 0 15px rgba(56, 189, 248, 0.8);
    filter: blur(1px);
    border-radius: 999px;
}

.card-hover {
    transition: transform 0.4s ease, border-color 0.4s ease, background-color 0.4s ease;
}

.card-hover:hover {
    transform: translateY(-5px);
    background-color: rgba(31, 41, 55, 0.6);
    border-color: rgba(59, 130, 246, 0.5);
}
</style>