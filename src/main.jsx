import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext'
import { registerServiceWorker, checkInstallable } from './registerSW'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)

// Registrar el service worker para PWA
registerServiceWorker();

// Comprobar si la app puede ser instalada
checkInstallable();
