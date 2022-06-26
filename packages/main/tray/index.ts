import { Menu, Tray, app, ipcMain } from 'electron'
import { staticPath } from '../../shared/utils'
import path from 'path'

export default (mainWindow: any) => {
  const trayMenuTemplate = [
    {
      label: '打开主页面',
      click: () => {
        mainWindow.webContents.send('mounted', import.meta.env)
        mainWindow.setSkipTaskbar(false)
        mainWindow.show()
      },
    },
    {
      label: '退出',
      click: () => {
        app.quit()
      },
    },
  ]

  // const iconPath = path.join(
  //   process.cwd(),
  //   import.meta.env.MODE === 'development'
  //     ? 'packages/renderer/public/logo-256x256.ico'
  //     : 'public/logo-256x256.ico',
  // )
  const iconPath = path.join(staticPath(), 'logo-256x256.ico')
  console.log('**************', iconPath)
  const appTray = new Tray(iconPath)
  app.whenReady().then(() => {
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate)

    appTray.setToolTip('YouAppName')

    appTray.setContextMenu(contextMenu)

    // 单击托盘小图标显示应用
    appTray.on('click', (e) => {
      mainWindow.setSkipTaskbar(false)
      mainWindow.show()
    })
  })
  return appTray
}
