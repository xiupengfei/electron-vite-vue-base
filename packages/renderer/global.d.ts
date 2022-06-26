export {}

/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare global {
  interface Window {
    // Expose some Api through preload script
    contextBridge: {
      fs: typeof import('fs')
      ipcRenderer: import('electron').IpcRenderer
      removeLoading: () => void
    }
  }
}
