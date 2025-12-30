<template>
    <section id="hero-section"
        class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 py-10 px-6 md:px-12 lg:px-18 xl:px-24 w-full">
        <div class="text-left max-w-2xl">
            <h1 class="text-3xl font-heading tracking-wide font-extrabold md:text-5xl bg-clip-text text-galaxy-text animate-fade-in-right opacity-0" style="animation-delay: 0.2s">
                Hello, <span class="bg-clip-text text-transparent bg-gradient-to-r from-glow-end to-glow-start">it's
                    me</span>
            </h1>
            <h4 class="mt-1 text-3xl md:text-6xl font-heading font-extrabold bg-clip-text text-galaxy-text animate-fade-in-right opacity-0" style="animation-delay: 0.2s"">
                TAUFIQ RAHMADI
            </h4>
            <p class="mt-1 text-2xl md:text-4xl font-extrabold text-galaxy-text animate-fade-in-right opacity-0" style="animation-delay: 0.4s"">
                I'am a <span ref="typingSpan"
                    class="font-sciFi bg-clip-text text-transparent bg-gradient-to-r from-glow-end to-glow-start">
                    {{ currentText }}
                </span>
            </p>
            <p class="mt-2 text-lg md:text-xl font-extralight text-galaxy-text animate-fade-in-right opacity-0" style="animation-delay: 0.6s"">
                Welcome to my portfolio website!
            </p>
            <div class="mt-6 flex flex-wrap gap-3 font-sciFi animate-fade-in-up opacity-0" style="animation-delay: 0.8s"">
                <Button color="outline" size="md" icon="download" @click="downloadCV">See CV</Button>
                <Button color="outline" size="md" :icon="['fab', 'github']"
                    @click="() => openLink(githubLink)">GitHub</Button>
                <Button color="outline" size="md" :icon="['fab', 'linkedin-in']"
                    @click="() => openLink(linkedinLink)">LinkedIn</Button>
            </div>
        </div>

        <div class="flex-shrink-0">
            <div ref="profileElement" class="profile-circle animate-profile-entrance"
                @mouseenter="hoverSound.play" @mouseleave="hoverSound.stop">
                <img src="@/assets/images/profil.jpg" alt="Taufiq" class="w-full h-full object-cover" />
            </div>
        </div>

    </section>
</template>

<script setup>
import Button from '@/components/ui/VButton.vue'
import { useTypingAnimation } from '@/components/composables/useTypingAnimation'
import { useHoverSound } from '@/components/composables/useHoverSound'
import { downloadCV, openLink } from '@/components/composables/useExternalAction'

const words = [
  "Web Developer.",
  "Mobile Developer.",
  "Frontend Engineer.",
  "Tech Enthusiast."
]

const { currentText } = useTypingAnimation(words)
const hoverSound = useHoverSound('/src/assets/images/Sound.mp3', 0.3)

const githubLink = 'https://github.com/taufiqrhmd'
const linkedinLink = 'https://linkedin.com/in/mohamad-taufiq-rahmadi'
</script>