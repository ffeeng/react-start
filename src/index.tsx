import './style.less'

import router from './router'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('app') as HTMLElement).render(
  <RouterProvider router={router} />
)
