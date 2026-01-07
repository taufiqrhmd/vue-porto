/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      scrollBehavior: ['smooth'],
      colors: {
        'galaxy-bg': '#0b0c1a',       
        'galaxy-darker': '#070812',   

        'galaxy-blue': '#2a4d8e',     
        'galaxy-cyan': '#4fc3f7',     
        'galaxy-purple': '#6a5acd',   
        'galaxy-magenta': '#c77dff',  

        'galaxy-text': '#e6f0ff',     
        'galaxy-text-muted': '#a0b3d5', 

        'galaxy-card': '#141a2e',     
        'galaxy-card-hover': '#1e2945', 

        'glow-start': '#60A5FA',     
        'glow-mid': '#A855F7',       
        'glow-end': '#EC4899',       
        'nebula-soft': '#141a2e',  
      },
      gradientColorStops: {
        'glow-start': '#60A5FA',     
        'glow-mid': '#A855F7',       
        'glow-end': '#EC4899',       
        'nebula-soft': '#141a2e',    
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Exo 2', 'sans-serif'],
        sciFi: ['Orbitron', 'sans-serif'],
        title: ['BBH Bartle', 'sans-serif'],
      },
    },
  },
  plugins: [],
};