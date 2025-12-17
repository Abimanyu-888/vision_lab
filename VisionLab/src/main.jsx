import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import RouteManage from './RouteMange.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouteManage />
  </StrictMode>,
)
