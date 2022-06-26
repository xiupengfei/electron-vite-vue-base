import fs from 'fs'
import { contextBridge, ipcRenderer } from 'electron'
import { domReady, withPrototype } from './utils'
import { useLoading } from './loading'

const { appendLoading, removeLoading } = useLoading()

void (async () => {
  await domReady()

  appendLoading()
})()

// --------- Expose some API to the Renderer process. ---------
// contextBridge.exposeInMainWorld('fs', fs)
// contextBridge.exposeInMainWorld('removeLoading', removeLoading)
// contextBridge.exposeInMainWorld('ipcRenderer', withPrototype(ipcRenderer))

contextBridge.exposeInMainWorld('contextBridge', {
  removeLoading,
  ipcRenderer: withPrototype(ipcRenderer),
  fs,
})
