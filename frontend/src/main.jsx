import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Providers
import { LocalizationProvider } from './components/LocalizationContext.jsx'; 

import ProviderComposer from './components/ProviderComposer.jsx'; // Composer
const providers = [
  LocalizationProvider,
];


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProviderComposer contexts={providers}>
      <App />
    </ProviderComposer>
  </StrictMode>,
)
