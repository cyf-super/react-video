import { useRoutes } from 'react-router-dom'
import './css/App.css'
import { useEffect } from 'react'
import routes from './router/index'
import { getData } from '@/api'

function App() {
  useEffect(() => {
    async function fetchData() {
      const data = await getData()
      console.log('data ', data)
    }
    fetchData()
  }, [])
  const element = useRoutes(routes)
  return <div className="App">{element}</div>
}

export default App
