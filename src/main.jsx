import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
<GoogleOAuthProvider clientId="1068975037197-ho33mos6cmdqcjv59mjr15o6aar9ngha.apps.googleusercontent.com">
   <App />
</GoogleOAuthProvider>; 
    </BrowserRouter>
  </StrictMode>,
)
