import React from 'react'
import ReactDOM from 'react-dom/client'

// Self-hosted fonts shared with the main app: Space Mono for the clock, Space
// Grotesk for the beat title, Inter for bullets.
import '@fontsource/space-grotesk/700.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/space-mono/400.css'
import '@fontsource/space-mono/700.css'

import './teleprompter.css'
import Teleprompter from './Teleprompter'

ReactDOM.createRoot(document.getElementById('tp-root')!).render(
  <React.StrictMode>
    <Teleprompter />
  </React.StrictMode>,
)
