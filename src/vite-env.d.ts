/// <reference types="vite/client" />

// Asset URL import for the downloadable report (?url → file URL in the folder
// build, inlined data URI in the single-file build).
declare module '*.docx?url' {
  const src: string
  export default src
}
