import { useEffect } from 'react'
import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import routes from './router/index'
import './css/App.css'
import { queryClient } from './queryClient/index'
import { userInfoKey } from '@/pages/login/hooks/useLogin'
import { LStorage } from '@cyf-super/utils'
import { userInfoStore } from './store/userInfoStore'

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const element = useRoutes(routes)

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/home', { replace: true })
    }
  }, [location.pathname, navigate])

  const user = LStorage.get(userInfoKey)
  if (user) {
    userInfoStore.getState().setUserInfo(user as User.InfoType)
  }
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">{element}</div>
    </QueryClientProvider>
  )
}

export default App
