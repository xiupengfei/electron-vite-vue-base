import { BrowserWindow } from 'electron'
import { staticPath } from '../../shared/utils'
import { join } from 'path'
import Win from './Win'

export default class StartWindow extends Win {
  constructor() {
    super()
    this.init()
  }

  init() {
    this.win = new BrowserWindow({
      width: 380,
      height: 120,
      title: 'Loading...',
      resizable: false,
      center: true,
      show: false,
      frame: false,
      autoHideMenuBar: true,
      alwaysOnTop: true,
      // icon: 'assets/icon.png',
      titleBarStyle: 'hidden',
    })

    this.win.loadURL(`file://${join(staticPath(), 'views/start-page.html')}`)

    this.win.once('ready-to-show', () => {
      this.show()
    })
    // this.win.webContents.openDevTools()
  }
}
