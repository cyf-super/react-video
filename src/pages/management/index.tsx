import { createElement } from 'react'
import { LaptopOutlined } from '@ant-design/icons'
import { LayoutMan } from '../layout'
import { Content } from './components/content'
import { Footer } from './components/footer'
import './style.css'

const menuOptions = [
  {
    id: 1,
    label: '全部',
  },
  {
    id: 2,
    label: '集合',
  },
  {
    id: 3,
    label: '函数',
  },
  {
    id: 4,
    label: '数列',
  },
]

export default function Management() {
  const menus = menuOptions.map((menu) => ({
    key: `${menu.id}`,
    icon: createElement(LaptopOutlined),
    label: `${menu.label}`,
  }))
  const clickMenuItem = (key: string) => {
    const item = menus.find((menu) => menu.key === key)
    console.log('🚀 ~ clickMenuItem ~ item:', item)
  }
  return (
    <LayoutMan
      sideMemu={menus}
      clickMenuItem={clickMenuItem}
      content={<Content />}
      footer={<Footer />}
    />
  )
}
