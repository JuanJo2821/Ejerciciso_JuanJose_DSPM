import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Contactos from './Contactos.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Contactos />
  </StrictMode>
)