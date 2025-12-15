/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      scrollBehavior: ['smooth'],
      colors: {
        // ——— GALAXY BASE ———
        // Dominan biru gelap sebagai latar utama
        'galaxy-bg': '#0b0c1a',       // Deep space blue — sangat gelap, hampir hitam
        'galaxy-darker': '#070812',   // Lebih gelap lagi — untuk overlay atau efek depth

        // ——— PRIMARY & ACCENTS ———
        'galaxy-blue': '#2a4d8e',     // Galactic core blue — primary untuk button & highlight
        'galaxy-cyan': '#4fc3f7',     // Nebula cyan — aksen terang, cocok untuk teks penting & ikon
        'galaxy-purple': '#6a5acd',   // Cosmic purple — aksen sekunder, elegan
        'galaxy-magenta': '#c77dff',  // Stellar magenta — untuk call-to-action or hover glow

        // ——— TEXT ———
        'galaxy-text': '#e6f0ff',     // Soft starlight white — teks utama (high contrast on bg)
        'galaxy-text-muted': '#a0b3d5', // Faint star cluster — teks sekunder / placeholder

        // ——— SURFACE / CARD ———
        'galaxy-card': '#141a2e',     // Nebula surface — card/background element
        'galaxy-card-hover': '#1e2945', // Slightly brighter on hover

        // ——— SUCCESS / WARNING / DANGER (opsional tapi sering dibutuhkan) ———
        'galaxy-success': '#4ade80',  // Bintang hijau terang — untuk status sukses
        'galaxy-warning': '#fb923c',  // Supernova oranye — peringatan
        'galaxy-danger': '#f87171',   // Red giant — error
      },

      gradientColorStops: {
        'glow-start': '#4fc3f7',     // cyan
        'glow-mid': '#2a4d8e',       // galaxy-blue
        'glow-end': '#6a5acd',       // purple
        'nebula-soft': '#141a2e',    // soft card bg → bisa untuk subtle glow inner
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        sciFi: ['Orbitron', 'sans-serif'],
      }
    },
  },
  plugins: [],
};