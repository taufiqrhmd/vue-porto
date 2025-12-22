import './assets/main.css'
import './assets/styles.css'

import { createApp } from 'vue'
import App from './App.vue'

// 🔹 Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Ikon yang dibutuhkan
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons' // ✅ `faLinkedinIn`, bukan `faLinkedin`

// Daftarkan ikon ke library
library.add(faDownload, faGithub, faLinkedinIn)

// 🔹 Buat instance app DULU
const app = createApp(App)

// 🔹 Baru daftarkan komponen global
app.component('font-awesome-icon', FontAwesomeIcon)

// 🔹 Baru mount
app.mount('#app')