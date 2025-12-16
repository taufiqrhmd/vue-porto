import { ref } from 'vue'

export function useHoverSound(audioUrl, volume = 0.3) {
  const isPlaying = ref(false)
  let audio = null

  const play = () => {
    if (isPlaying.value) return

    if (!audio) {
      audio = new Audio(audioUrl)
      audio.volume = volume
      audio.onended = () => { isPlaying.value = false }
    }

    audio.play()
      .then(() => isPlaying.value = true)
      .catch(e => {
        console.warn('Autoplay blocked or sound failed:', e)
        isPlaying.value = false
      })
  }

  const stop = () => {
    if (audio && isPlaying.value) {
      audio.pause()
      audio.currentTime = 0
      isPlaying.value = false
    }
  }

  return { play, stop }
}