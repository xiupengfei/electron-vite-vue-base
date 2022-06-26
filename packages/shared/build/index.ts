import { resolve } from 'path'

export const wrapperEnv = (env: Record<string, string> = {}) => {
  for (let n in env) {
    process.env[n] = env[n]
  }

  process.env.VITE__STATIC = 'static'

  return env
}
