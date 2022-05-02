import { createServer, build } from 'vite'
import electron from 'electron'
import { spawn } from 'child_process'

const watchPreload = () => {
  return build({
    mode: 'development',
    configFile: 'packages/preload/vite.config.ts',
  })
}

/**
 * @param {*} server import('vite').ViteDevServer
 */

const watchMain = (server) => {
  const env = Object.assign(process.env, {})
  let electronProcess = null

  return build({
    configFile: 'packages/main/vite.config.ts',
    mode: 'development',
    plugins: [
      {
        name: 'electron-main-watcher',
        writeBundle() {
          electronProcess && electronProcess.kill()
          electronProcess = spawn(electron, ['.'], { stdio: 'inherit', env })
        },
      },
    ],
    build: {
      watch: true,
    },
  })
}

// bootstrap
const server = await createServer({ configFile: 'packages/renderer/vite.config.ts' })

await server.listen()
await watchPreload(server)
await watchMain(server)
