import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useTypingAnimation(words, typingSpeed = 100, deletingSpeed = 50, pauseDelay = 2000) {
  const currentText = ref('')
  let wordIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typingTimeout = null

  const startTypingAnimation = () => {
    const currentWord = words[wordIndex % words.length]

    if (!isDeleting) {
      currentText.value = currentWord.substring(0, ++charIndex)
      if (charIndex === currentWord.length) {
        isDeleting = true
        typingTimeout = setTimeout(startTypingAnimation, pauseDelay)
        return
      }
    } else {
      currentText.value = currentWord.substring(0, --charIndex)
      if (charIndex === 0) {
        isDeleting = false
        wordIndex++
      }
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed
    typingTimeout = setTimeout(startTypingAnimation, speed)
  }

  onMounted(() => {
    startTypingAnimation()
  })

  onBeforeUnmount(() => {
    if (typingTimeout) clearTimeout(typingTimeout)
  })

  return { currentText }
}