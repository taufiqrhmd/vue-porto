<template>
  <section id="skill" class="py-16 px-4 md:px-8 max-w-4xl mx-auto">
    <h2 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent mb-12 text-center">
      Skills Saya
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Frontend Skills -->
      <div class="bg-galaxy-darker/50 backdrop-blur-sm p-6 rounded-xl border border-galaxy-border">
        <h3 class="text-xl font-semibold text-galaxy-accent mb-4">Frontend Development</h3>
        <ul class="space-y-2">
          <li class="flex items-center">
            <span class="w-2 h-2 bg-glow-start rounded-full mr-3"></span>
            <span class="text-galaxy-text">HTML, CSS, JavaScript</span>
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 bg-glow-start rounded-full mr-3"></span>
            <span class="text-galaxy-text">Vue.js</span>
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 bg-glow-start rounded-full mr-3"></span>
            <span class="text-galaxy-text">Tailwind CSS</span>
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 bg-glow-start rounded-full mr-3"></span>
            <span class="text-galaxy-text">Animasi CSS & GSAP</span>
          </li>
        </ul>
      </div>

      <!-- Backend & Lainnya -->
      <div class="bg-galaxy-darker/50 backdrop-blur-sm p-6 rounded-xl border border-galaxy-border">
        <h3 class="text-xl font-semibold text-galaxy-accent mb-4">Backend & Lainnya</h3>
        <ul class="space-y-2">
          <li class="flex items-center">
            <span class="w-2 h-2 bg-glow-end rounded-full mr-3"></span>
            <span class="text-galaxy-text">Node.js / Express.js (Pelajaran)</span>
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 bg-glow-end rounded-full mr-3"></span>
            <span class="text-galaxy-text">PHP & Laravel</span>
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 bg-glow-end rounded-full mr-3"></span>
            <span class="text-galaxy-text">Git & GitHub</span>
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 bg-glow-end rounded-full mr-3"></span>
            <span class="text-galaxy-text">C++ (Software Kasir)</span>
          </li>
          <li class="flex items-center">
            <span class="w-2 h-2 bg-glow-end rounded-full mr-3"></span>
            <span class="text-galaxy-text">Flutter (Eksplorasi)</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Additional Skills -->
    <div class="mt-10 bg-galaxy-darker/30 backdrop-blur-sm p-6 rounded-xl border border-galaxy-border">
      <h3 class="text-xl font-semibold text-galaxy-accent mb-4">Keahlian Tambahan</h3>
      <ul class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <li class="flex items-center justify-center bg-galaxy-bg/50 py-2 rounded-lg">
          <span class="text-galaxy-text">Responsive Design</span>
        </li>
        <li class="flex items-center justify-center bg-galaxy-bg/50 py-2 rounded-lg">
          <span class="text-galaxy-text">UI/UX Principles</span>
        </li>
        <li class="flex items-center justify-center bg-galaxy-bg/50 py-2 rounded-lg">
          <span class="text-galaxy-text">Problem Solving</span>
        </li>
        <li class="flex items-center justify-center bg-galaxy-bg/50 py-2 rounded-lg">
          <span class="text-galaxy-text">Teamwork</span>
        </li>
        <li class="flex items-center justify-center bg-galaxy-bg/50 py-2 rounded-lg">
          <span class="text-galaxy-text">Komunikasi</span>
        </li>
        <li class="flex items-center justify-center bg-galaxy-bg/50 py-2 rounded-lg">
          <span class="text-galaxy-text">English (Basic)</span>
        </li>
      </ul>
    </div>
  </section>
</template>