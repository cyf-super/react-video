import { useState } from 'react'
import bg from '@/assets/bg8.png'
import { HomeBg } from './style'
import Header from '@/components/header'

export default function Home() {
  const [searchV, setSearchV] = useState('')

  const search = (value: string) => {
    setSearchV(value)
  }
  return (
    <HomeBg>
      <img className="bg" src={bg} alt="" />
      <div className="container">
        <div className="aside" />
        <div className="main">
          <div className="header">
            <Header searchV={searchV} inputChange={search} />
          </div>
          <div className="content" />
        </div>
      </div>
    </HomeBg>
  )
}
