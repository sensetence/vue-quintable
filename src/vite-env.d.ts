/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}



// Prism plugins register themselves on Prism and export nothing.
declare module 'prismjs/plugins/*'
