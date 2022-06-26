import { defineConfig, ConfigEnv, loadEnv } from 'vite'
import { resolve } from 'path'
import { builtinModules } from 'module'
// import electron from 'vite-plugin-electron-renderer'
import { wrapperEnv } from '../shared/build'
import pkg from '../../package.json'

export default ({ mode, command }: ConfigEnv) => {
  wrapperEnv(loadEnv(mode, process.cwd()))
  console.log('-----preload----', process.env.NODE_ENV, mode)
  return defineConfig({
    root: __dirname,
    mode: process.env.NODE_ENV,
    build: {
      sourcemap: 'inline',
      outDir: resolve(process.cwd(), 'dist/preload'),
      lib: {
        entry: 'index.ts',
        formats: ['cjs'],
        fileName: () => '[name].cjs',
      },
      minify: mode === 'production',
      rollupOptions: {
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
