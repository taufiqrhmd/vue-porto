<template>
  <section id="projects" class="py-16 px-4 overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <!-- Opsional: Judul Section -->
      <h2 class="text-3xl font-bold text-center mb-10 text-gray-800">Featured Projects</h2>

      <!-- Carousel Container -->
      <div
        ref="carouselContainer"
        class="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
        style="scrollbar-width: none; -ms-overflow-style: none;"
      >
        <!-- Card Item 1 -->
        <div
          class="snap-start shrink-0 w-full md:w-[90vw] lg:w-[80vw] h-[60vh] md:h-[70vh] relative rounded-2xl overflow-hidden shadow-2xl mx-2"
        >
          <!-- Gambar proyek (ganti src sesuai kebutuhan) -->
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200"
            alt="Project Alpha"
            class="w-full h-full object-cover"
          />
          <!-- Overlay on hover -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end pb-8 px-6 text-white opacity-0 hover:opacity-100 transition-all duration-500 ease-out"
          >
            <h3 class="text-2xl md:text-3xl font-bold mb-3 text-center">Project Alpha</h3>
            <p class="text-lg opacity-90 mb-5 text-center max-w-2xl">
              A modern dashboard built with Vue 3, TypeScript, and Tailwind CSS.
            </p>
            <button
              class="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-gray-100 transition shadow-lg transform hover:-translate-y-1"
            >
              View Details
            </button>
          </div>
        </div>

        <!-- Card Item 2 -->
        <div
          class="snap-start shrink-0 w-full md:w-[90vw] lg:w-[80vw] h-[60vh] md:h-[70vh] relative rounded-2xl overflow-hidden shadow-2xl mx-2"
        >
          <img
            src="https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200"
            alt="Project Beta"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end pb-8 px-6 text-white opacity-0 hover:opacity-100 transition-all duration-500 ease-out"
          >
            <h3 class="text-2xl md:text-3xl font-bold mb-3 text-center">Project Beta</h3>
            <p class="text-lg opacity-90 mb-5 text-center max-w-2xl">
              Real-time chat app using Firebase, Vue, and WebSocket integration.
            </p>
            <button
              class="px-6 py-3 bg-white text-teal-700 font-semibold rounded-lg hover:bg-gray-100 transition shadow-lg transform hover:-translate-y-1"
            >
              View Details
            </button>
          </div>
        </div>

        <!-- Card Item 3 -->
        <div
          class="snap-start shrink-0 w-full md:w-[90vw] lg:w-[80vw] h-[60vh] md:h-[70vh] relative rounded-2xl overflow-hidden shadow-2xl mx-2"
        >
          <img
            src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200"
            alt="Project Gamma"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end pb-8 px-6 text-white opacity-0 hover:opacity-100 transition-all duration-500 ease-out"
          >
            <h3 class="text-2xl md:text-3xl font-bold mb-3 text-center">Project Gamma</h3>
            <p class="text-lg opacity-90 mb-5 text-center max-w-2xl">
              E-commerce platform with Laravel backend and Vue frontend.
            </p>
            <button
              class="px-6 py-3 bg-white text-amber-700 font-semibold rounded-lg hover:bg-gray-100 transition shadow-lg transform hover:-translate-y-1"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Sembunyikan scrollbar */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>