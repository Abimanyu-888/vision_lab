import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './main.css'

import App from './App/App.jsx'
import SignIn from './Authenticate/Authenticate.jsx'

const router=createBrowserRouter([
  {path:"/",element:<App/>},
  {path:"/login",element:<SignIn/>}
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
