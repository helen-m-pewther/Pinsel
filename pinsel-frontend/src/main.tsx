import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import AuthLayout from './login/Login.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<App />}/>
        
        <Route element={<AuthLayout />}>
          <Route path="login"/> 
          <Route path="register"/>
        </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
