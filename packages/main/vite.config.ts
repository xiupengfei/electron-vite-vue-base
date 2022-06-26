import { defineConfig, ConfigEnv, loadEnv } from 'vite'
import { resolve } from 'path'
import { builtinModules } from 'module'
import pkg from '../../package.json'
// import electron from 'vite-plugin-electron-renderer'
import { wrapperEnv } from '../shared/build'

export default ({ mode, command }: ConfigEnv) => {
  // const env = loadEnv(mode, process.cwd())
  // console.log('------------main', env)
  wrapperEnv(loadEnv(mode, process.cwd()))
  console.log('-----main----', process.env.NODE_ENV, mode)
  return defineConfig({
    root: __dirname,
    mode: process.env.NODE_ENV,
    build: {
      sourcemap: true,
      outDir: resolve(process.cwd(), 'dist/main'),
      lib: {
        entry: 'index.ts',
        formats: ['cjs'],
        fileName: () => '[name].cjs',
      },
      minify: mode === 'production',
      rollupOptions: {
        // 'release' is not exported by __vite-browser-external:os, imported by packages/main/index.ts
        // 引入builtinModules
        external: ['electron', ...builtinModules, ...Object.keys(pkg.dependencies || {})],
      },
    },
    resolve: {
      alias: {
        '@/': `${resolve(__dirname, 'src')}/`,
        '#/': `${resolve(__dirname, '../main')}/`,
        '@shared/': `${resolve(__dirname, '../shared')}/`,
      },
    },
  })
}
