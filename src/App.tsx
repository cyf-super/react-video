import { useEffect } from 'react'
import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import routes from './router/index'
import './css/App.css'
import { queryClient } from './queryClient/index'

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const element = useRoutes(routes)

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/home', { replace: true })
    }
  }, [location.pathname, navigate])
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">{element}</div>
    </QueryClientProvider>
  )
}

export default App
