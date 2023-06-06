import { useRoutes } from 'react-router-dom'
import './css/App.css'
import routes from './router/index'

function App() {
  const element = useRoutes(routes)
  return <div className="App">{element}</div>
}

export default App
