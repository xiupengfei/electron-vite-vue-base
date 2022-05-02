import { defineConfig, ConfigEnv, loadEnv } from 'vite'
import { resolve } from 'path'
// import electron from 'vite-plugin-electron-renderer'
import { wrapperEnv } from '../shared/build'

export default ({ mode, command }: ConfigEnv) => {
  wrapperEnv(loadEnv(mode, process.cwd()))
  console.log('-----preload----', process.env.NODE_ENV, mode)
  return defineConfig({
    root: __dirname,
    mode: process.env.NODE_ENV,
    build: {
      sourcemap: 'inline',
      outDir: '../../dist/preload',
      lib: {
        entry: 'index.ts',
        formats: ['cjs'],
        fileName: () => '[name].cjs',
      },
      minify: mode === 'production',
      rollupOptions: {
        // external: ['electron', ...builtinModules, ...Object.keys(pkg.dependencies || {})],
      },
    },
  })
}
