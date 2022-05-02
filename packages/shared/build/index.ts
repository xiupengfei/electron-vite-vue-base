import { resolve } from 'path'

export const wrapperEnv = (env: Record<string, string> = {}) => {
  for (let n in env) {
    process.env[n] = env[n]
  }

  process.env.VITE__STATIC =
    process.env.NODE_ENV === 'development' ? 'packages/renderer/public' : 'public'
  console.log('-------------share1', process.env.VITE__STATIC, process.env.NODE_ENV)
  return env
}
