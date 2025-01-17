import { lazy, Suspense, JSX } from 'react'
import { createHashRouter, Navigate, redirect } from 'react-router-dom'

import Login from '@/pages/login'
import NotFound from '@/pages/404'

const lazyElement = (
  factory: () => Promise<{
    default: () => JSX.Element | null
  }>,
  props?: any
) => {
  const Element = lazy(() => factory())
  return (
    <Suspense>
      <Element {...props} />
    </Suspense>
  )
}



const router = createHashRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router
