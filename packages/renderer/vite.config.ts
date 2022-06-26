import { defineConfig, ConfigEnv, loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { wrapperEnv } from '../shared/build'
// 渲染进程使用electron
import electron from 'vite-plugin-electron-renderer'

// import progress from 'vite-plugin-progress'

export default ({ mode, command }: ConfigEnv) => {
  wrapperEnv(loadEnv(mode, process.cwd()))

  console.log('process.cwd()', process.cwd())

  return defineConfig({
    root: __dirname,
    mode: process.env.NODE_ENV,
    plugins: [vue(), electron()],
    base: './',
    build: {
      sourcemap: true,
      outDir: resolve(process.cwd(), 'dist/renderer'),
    },
    resolve: {
      alias: {
        '@/': `${resolve(__dirname, 'src')}/`,
        '#/': `${resolve(__dirname, '../main')}/`,
        '@shared/': `${resolve(__dirname, '../shared')}/`,
      },
    },
    server: {
      host: '0.0.0.0',
      port: 8082,
    },
  })
}
