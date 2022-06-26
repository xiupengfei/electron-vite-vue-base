import { app, BrowserWindow, shell } from 'electron'
import { staticPath } from '../../shared/utils'
import { join } from 'path'
import Win from './Win'

export default class MainWindow extends Win {
  constructor() {
    super()
    this.init()
  }

  init() {
    // 配置: https://cloud.tencent.com/developer/section/1115971
    this.win = new BrowserWindow({
      show: false,
      // backgroundColor: '#2e2c29',
      // useContentSize: false,
      // 是否在任务栏中显示窗口。默认是false
      // skipTaskbar: true,
      icon: join(staticPath(), 'icon.png'),
      webPreferences: {
        preload: join(__maindir, '../preload/index.cjs'),
        // 在渲染进程中使用node, 默认关闭
        nodeIntegration: false,
        /**
         * 是否在单独的JavaScript上下文中运行Electron API和指定的“预加载”脚本。
         * 默认值为“false”。“preload”脚本运行的上下文仍然可以完全访问“document”和“window”全局变量，
         * 但它将使用自己的一组JavaScript内置变量（“Array”、“Object”、“JSON”等），
         * 并且将与加载的页面对全局环境所做的任何更改隔离开来。Electron API仅在“预加载”脚本中可用，
         * 而在加载的页面中不可用。加载可能不受信任的远程内容时应使用此选项，
         * 以确保加载的内容不会篡改“preload”脚本和正在使用的任何Electron API
         */
        contextIsolation: true,
      },
    })
  }

  load(): void {
    if (app.isPackaged) {
      this.win.loadFile(join(__maindir, '../renderer/index.html'))
    } else {
      // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
      const url = `http://127.0.0.1:8082`
      this.win.loadURL(url)
    }

    // Make all links open with the browser, not with the application
    // this.win.webContents.setWindowOpenHandler(({ url }) => {
    //   if (url.startsWith('https:')) shell.openExternal(url)
    //   return { action: 'deny' }
    // })
  }

  start() {
    this.load()
    // 加载页面时，ready-to-show如果窗口尚未显示，则渲染器进程首次渲染页面时会发出事件。
    // 在此事件之后显示窗口将没有可视闪光灯
    return new Promise((resolve) => {
      this.win.once('ready-to-show', () => {
        setTimeout(() => {
          resolve(void 0)
          this.show()
        }, 1000)
      })
    })
  }
}
