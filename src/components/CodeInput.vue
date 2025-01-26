<template>
    <div class="code-input">
      <input 
        v-model="code" 
        type="text"
        placeholder="Введіть код"
        @paste="handlePaste"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { setupSMSFallbackListener, setupCodeListener } from '@/services/smsHandler'
  
  const code = ref('')
  
  const handlePaste = (event) => {
    const pastedText = event.clipboardData.getData('text')
    const codeMatch = pastedText.match(/Код для входу: (\w+)/)
    if (codeMatch) {
      code.value = codeMatch[1]
      event.preventDefault()
    }
  }
  
  onMounted(() => {
    setupSMSFallbackListener()
    setupCodeListener((extractedCode) => {
      code.value = extractedCode
    })
  })
  </script>