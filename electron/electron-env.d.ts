/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬─┬ dist
     * │ │ └── index.html
     * │ │
     * │ ├─┬ dist-electron
     * │ │ ├── main.js
     * │ │ └── preload.js
     * │
     * ```
     */
    APP_ROOT: string
    /** /dist/ or /public/ */
    VITE_PUBLIC: string
  }
}

// Used in Renderer process, expose in `preload.ts`
interface Idea {
  text: string
  createdAt: string
}

interface Window {
  ipcRenderer: import('electron').IpcRenderer
  ideaBubble: {
    saveIdea: (text: string) => Promise<boolean>
    readIdeas: () => Promise<Idea[]>
  }
}
