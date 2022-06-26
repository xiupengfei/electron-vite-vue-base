import { app, BrowserWindow, shell } from 'electron'

export default class Win {
  protected win!: BrowserWindow

  constructor() {}

  getWindow() {
    return this.win
  }

  load() {}

  start() {}

  show() {
    this.win.show()
  }

  hide() {
    this.win.hide()
  }

  destroy() {
    this.win.destroy()
  }
}
