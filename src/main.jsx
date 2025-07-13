import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { dark, shadesOfPurple } from '@clerk/themes'
import './index.css'
import App from './App.jsx'

// You'll need to get this from your Clerk dashboard
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} appearance={{
      baseTheme: dark,
      variables: {
        colorPrimary: '#ab3eff',
      },
    }}>
      <App />
    </ClerkProvider>
  </StrictMode>,
)
