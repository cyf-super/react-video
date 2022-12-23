import { useMemo } from 'react'
import { useRoutes } from 'react-router-dom'
import './App.css'
import routes from './router/index'

function App(props: any) {
  const { tag } = props

  useMemo(() => tag, [])

  const element = useRoutes(routes)

  return <div className="App">{element}</div>
}

export default App
