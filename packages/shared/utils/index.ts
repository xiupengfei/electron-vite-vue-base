import { resolve } from 'path'

export const staticPath = () => {
  return resolve(process.cwd(), 'static')
}
