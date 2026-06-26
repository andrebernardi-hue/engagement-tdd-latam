import React from 'react'
import ReactDOM from 'react-dom/client'

// Self-hosted fonts (01-TECH-SETUP §1). Loaded with the weights the type scale
// uses, font-display: swap by default to avoid render-blocking + layout shift.
import '@fontsource/space-grotesk/600.css'
import '@fontsource/space-grotesk/700.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/space-mono/400.css'
import '@fontsource/space-mono/700.css'

import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
