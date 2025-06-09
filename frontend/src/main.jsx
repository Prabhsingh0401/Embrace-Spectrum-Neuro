import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { CalmModeProvider } from './components/Providers/CalmModeContext.jsx';
import { AudioDescriptionProvider } from './components/AudioDescription/AudioDescriptionContext';

import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <CalmModeProvider>
            <AudioDescriptionProvider>
              <App />
            </AudioDescriptionProvider>
          </CalmModeProvider>
        </ClerkProvider>
  </StrictMode>,
)
