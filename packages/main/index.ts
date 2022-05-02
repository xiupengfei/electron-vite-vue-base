import { app, BrowserWindow, shell, ipcMain, Tray } from 'electron'
import { release } from 'os'
import { join, resolve } from 'path'

import setupTray from './tray'

// 禁用Windows 7的GPU加速
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// 设置Windows 10+通知的应用程序名称

if (process.platform === 'win32') app.setAppUserModelId(app.getName())
console.log('------------------start', app.requestSingleInstanceLock())
if (!app.requestSingleInstanceLock()) {
  console.warn('======有运行的进程=====')
  app.quit()
  process.exit(0)
}

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
let appTray: Tray

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    icon: resolve(process.cwd(), 'packages/renderer/public/logo.png'),
    webPreferences: {
      preload: join(__dirname, '../preload/index.cjs'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  // 应用程序已打包， 生产环境
  if (app.isPackaged) {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  } else {
    // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
    const url = `http://127.0.0.1:8081`
    win.loadURL(url)
  }

  win.webContents.openDevTools()

  // Test active push message to Renderer-process
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('mounted', 'main', import.meta.env)
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

  appTray = setupTray(win)

  ipcMain.on('close', (e) => {
    console.log('======销毁')
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
