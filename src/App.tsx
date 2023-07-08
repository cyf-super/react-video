import { useRoutes } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import './css/App.css'
import routes from './router/index'

function App() {
  const queryclient = new QueryClient()
  const element = useRoutes(routes)
  return (
    <QueryClientProvider client={queryclient}>
      <div className="App">{element}</div>
    </QueryClientProvider>
  )
}

export default App
