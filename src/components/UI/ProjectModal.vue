<template>
    <div class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
        @click.stop>
        <div class="bg-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-gray-700 shadow-2xl relative"
            role="dialog" aria-modal="true">
            <button @click="$emit('close')"
                class="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors z-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div class="p-8 md:p-12 text-white">
                <h2
                    class="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    {{ project.title }}
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h4 class="text-blue-400 uppercase text-xs font-black tracking-widest mb-2">Role</h4>
                        <p class="text-lg text-gray-200">{{ details.role }}</p>
                    </div>

                    <div v-if="details.tech_stacks && details.tech_stacks.length > 0">
                        <h4 class="text-blue-400 uppercase text-xs font-black tracking-widest mb-2">Tech Stack</h4>
                        <div class="flex flex-wrap gap-2">
                            <span v-for="tech in details.tech_stacks" :key="tech"
                                class="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-300">
                                {{ tech }}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="border-t border-gray-700 pt-6">
                    <h4 class="text-blue-400 uppercase text-xs font-black tracking-widest mb-3">Project Description</h4>
                    <p class="text-gray-300 leading-relaxed text-lg">
                        {{ details.description }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    project: Object,  // Dari table Projects
    details: Object   // Dari table Project_Details (berisi role, description, tech_stack)
});
defineEmits(['close']);
</script>