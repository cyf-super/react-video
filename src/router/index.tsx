import { lazy } from 'react'

const lazyLoad = (moduleName: string) => {
  const Module = lazy(() => import(`@/pages/${moduleName}/home/index.tsx`))
  return <Module />
}

const loadLayout = (moduleName: string) => {
  const Module = lazy(() => import(`@/pages/layout/${moduleName}/index.tsx`))
  return <Module />
}

interface Router {
  name: string
  path: string
  children?: Array<Router>
  element: any
}

const routes: Router[] = [
  {
    path: '/login',
    name: 'login',
    element: lazyLoad('login'),
  },
  {
    path: '/',
    name: 'home',
    element: loadLayout('home'),
  },
]

export default routes
