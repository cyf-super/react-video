import { useEffect } from 'react'
import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import routes from './router/index'
import store from './store'
import './css/App.css'

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const queryclient = new QueryClient()
  const element = useRoutes(routes)

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/home', { replace: true })
    }
  }, [location.pathname, navigate])
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryclient}>
        <div className="App">{element}</div>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
