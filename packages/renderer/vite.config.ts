import { defineConfig, ConfigEnv, loadEnv } from 'vite'
// import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { wrapperEnv } from '../shared/build'
// 渲染进程使用electron
import electron from 'vite-plugin-electron-renderer'

export default ({ mode, command }: ConfigEnv) => {
  wrapperEnv(loadEnv(mode, process.cwd()))

  return defineConfig({
    root: __dirname,
    mode: process.env.NODE_ENV,
    plugins: [vue(), electron()],
    base: './',
    build: {
      sourcemap: true,
      outDir: '../../dist/renderer',
    },
    server: {
      host: '0.0.0.0',
      port: 8081,
    },
  })
}
