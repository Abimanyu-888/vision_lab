// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './main.css'
import App from './App/App.jsx'
import SignIn from './Authenticate/Authenticate.jsx'
import { AuthProvider } from './auth_context.jsx'

import { ImageProvider } from './image_context.jsx'

const router = createBrowserRouter([
  { path: "/", element: <App/> },
  { path: "/login", element: <SignIn/> }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ImageProvider>
        <RouterProvider router={router}/>
      </ImageProvider>
    </AuthProvider>
  </StrictMode>,
)