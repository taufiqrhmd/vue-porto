<template>
  <div class="bg-gray-900 text-white font-sans">
    
    <section id="contact" class="py-20 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p class="text-gray-400">Punya ide menarik? Mari kita wujudkan menjadi kenyataan.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div class="space-y-8">
            <div class="flex items-start space-x-4">
              <div class="bg-blue-500/10 p-3 rounded-lg text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 class="text-xl font-semibold">Email</h4>
                <p class="text-gray-400">halo@emailanda.com</p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="bg-purple-500/10 p-3 rounded-lg text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 class="text-xl font-semibold">Lokasi</h4>
                <p class="text-gray-400">Jakarta, Indonesia</p>
              </div>
            </div>
          </div>

          <form class="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 backdrop-blur-sm">
            <div class="grid grid-cols-1 gap-6">
              <input type="text" placeholder="Nama Anda" class="bg-gray-900 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-500 transition shadow-sm" />
              <input type="email" placeholder="Email" class="bg-gray-900 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-500 transition shadow-sm" />
              <textarea placeholder="Pesan Anda" rows="4" class="bg-gray-900 border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-500 transition shadow-sm"></textarea>
              <button class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 rounded-lg transition duration-300 transform hover:-translate-y-1">
                Kirim Pesan
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <footer class="bg-gray-950 pt-16 pb-8 border-t border-gray-800">
      <div class="max-w-6xl mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-center mb-12">
          <div class="mb-8 md:mb-0">
            <span class="text-2xl font-bold tracking-tighter italic">NAMA<span class="text-blue-500 underline">BRAND</span></span>
            <p class="text-gray-500 mt-2 max-w-xs">Membangun pengalaman digital yang bermakna dan berdampak.</p>
          </div>
          
          <div class="flex space-x-6 text-gray-400">
            <a href="#" class="hover:text-blue-400 transition">GitHub</a>
            <a href="#" class="hover:text-blue-400 transition">LinkedIn</a>
            <a href="#" class="hover:text-blue-400 transition">Instagram</a>
          </div>
        </div>
        
        <div class="border-t border-gray-900 pt-8 text-center text-gray-600 text-sm">
          <p>&copy; 2024 NamaBrand. All rights reserved.</p>
        </div>
      </div>
    </footer>

  </div>
</template>