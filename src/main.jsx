import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import MissionNav from './components/MissionNav'
import 'lenis/dist/lenis.css'
import './styles.css'
import './mission-nav.css'
import './v3.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MissionNav />
    <App />
  </React.StrictMode>,
)
