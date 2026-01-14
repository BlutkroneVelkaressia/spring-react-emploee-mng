import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryProvider } from './providers/QueryProvider'
import { RouterProvider } from './providers/RouterProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider>
        <App />
      </RouterProvider>
    </QueryProvider>
  </StrictMode>,
)
