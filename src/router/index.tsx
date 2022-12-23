import { lazy } from 'react'

const lazyLoad = (moduleName: string) => {
  const Module = lazy(() => import(`@/pages/${moduleName}/index.tsx`))
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
]

export default routes
