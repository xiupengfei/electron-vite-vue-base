<script setup lang="ts">
  // import path from 'path'
  import Debug from './Debug.vue'

  window.contextBridge.ipcRenderer.on('mounted', (e: any, ...args) => {
    console.log('mounted', args)
    console.log('appenv', import.meta.env)
  })
</script>

<template>
  <div class="logo-box">
    ceshi
    <Debug />
  </div>
</template>

<style></style>
