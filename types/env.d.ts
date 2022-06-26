interface ImportMetaEnv {
  readonly VITE_SERVICE: string
  VITE__STATIC: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
