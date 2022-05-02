<script setup lang="ts">
  import { ipcRenderer } from 'electron'
  import path from 'path'
  console.log('vu1e', import.meta.env)
  console.log('staticpath', path.join(process.cwd(), import.meta.env.VITE__STATIC))
  ipcRenderer.on('mounted', (e: any, ...args) => {
    console.log('mounted', args)
    console.log('appenv', import.meta.env)
  })
</script>

<template>
  <div class="logo-box"> ceshi </div>
</template>

<style></style>
