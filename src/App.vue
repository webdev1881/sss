<template>
  <div id="app">
    <h1>SMS Code Verification</h1>
    <CodeInput />
  </div>
</template>

<script setup>
import CodeInput from './components/CodeInput.vue'
import { onMounted } from 'vue'
import { setupSMSFallbackListener } from './services/smsHandler'

onMounted(() => {
  setupSMSFallbackListener()
})
</script>