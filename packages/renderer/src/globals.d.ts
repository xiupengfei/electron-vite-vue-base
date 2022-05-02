export {}

declare global {
  interface Window {
    removeLoading: () => void
  }
}

declare var __static: string
