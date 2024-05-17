// import { metions } from 'framer-motion'
import { memo } from 'react'
import { AppHeader } from '@/pages/layout/header/index'
import { ProjectGrid } from './components/projectGrid'
import HomeSwiper from './components/homeSwiper'

function Home() {
  return (
    <>
      <AppHeader />
      <HomeSwiper />
      <ProjectGrid />
    </>
  )
}

export default memo(Home)
