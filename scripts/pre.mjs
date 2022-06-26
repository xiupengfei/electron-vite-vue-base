import fse from 'fs-extra'
import { join } from 'path'

const staticFiels = [
  [
    'static', // src
    'static', // target
  ],
]

staticFiels.forEach(([src, target]) => {
  // console.log(join(process.cwd(), src))
  fse.copySync(src, join(process.cwd(), 'dist', target), { overwrite: true })
})
