import { useRoutes } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import routes from './router/index'
import store from './store'
import './css/App.css'

function App() {
  const queryclient = new QueryClient()
  const element = useRoutes(routes)
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryclient}>
        <div className="App">{element}</div>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
