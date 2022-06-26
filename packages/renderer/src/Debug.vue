<script setup lang="ts">
  import { EIPCAction } from '#/ipc/action.enum'

  const handleOpenDevTools = () => {
    window.contextBridge.ipcRenderer.send(EIPCAction.DEV_OPEN_DEV_TOOLS)
  }
</script>

<template>
  <div class="debug">
    <span @click="handleOpenDevTools">Debug</span>
  </div>
</template>

<style lang="less" scoped>
  .debug {
    position: fixed;
    right: 10px;
    bottom: 10px;
    z-index: 100000;
    span {
      display: inline-block;
      width: 60px;
      height: 60px;
      background-color: #448aff;
      text-align: center;
      line-height: 60px;
      color: white;
      cursor: pointer;
      border-radius: 50%;
    }
  }</style
>>
