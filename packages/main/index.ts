import { app, BrowserWindow, shell, ipcMain, Tray } from 'electron'
import { release } from 'os'
// import { join, resolve } from 'path'

import setupTray from './tray'
import './env'
import './ipc'
import StartWindow from './windows/StartWindow'
import MainWindow from './windows/MainWindow'
import { EIPCAction } from './ipc/action.enum'

console.log('###########', global.__maindir222)

// 禁用Windows 7的GPU加速
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// 设置Windows 10+通知的应用程序名称

if (process.platform === 'win32') app.setAppUserModelId(app.getName())
console.log('------------------start', app.requestSingleInstanceLock())

console.log('---static', import.meta.env.VITE__STATIC)
if (!app.requestSingleInstanceLock()) {
  console.warn('======有运行的进程=====')
  app.quit()
  process.exit(0)
}

// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
let appTray: Tray

async function createWindow() {
  // 启动页面
  const startWindow = new StartWindow()

  const mainWindow = new MainWindow()
  win = mainWindow.getWindow()

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('mounted', 'main', import.meta.env)
  })

  mainWindow.start().then(() => {
    // 主页面启动完毕后，隐藏启动页面
    startWindow.destroy()
  })

  win.webContents.openDevTools()

  ipcMain.on(EIPCAction.DEV_OPEN_DEV_TOOLS, () => {
    console.log('----open-dev-tools')
    win?.webContents.openDevTools()
  })

  appTray = setupTray(win)

  ipcMain.on('close', (e) => {
    console.log('======销毁托盘====')
    appTray && appTray.destroy()
    app.quit()
    process.exit(0)
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})
