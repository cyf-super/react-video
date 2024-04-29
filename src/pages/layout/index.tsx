import { Layout } from 'antd'
import { ReactNode } from 'react'
import { AppHeader } from './header'
import './style.module.css'

const { Header, Sider, Content } = Layout
const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  height: 80,
  paddingInline: 50,
  lineHeight: '48px',
  backgroundColor: '#fff',
}

const siderStyle: React.CSSProperties = {
  backgroundColor: '#F7F7F7',
}

interface LayoutParamsType {
  content: ReactNode
  categorySider: ReactNode
}

export const LayoutMan = ({ content, categorySider }: LayoutParamsType) => (
  <Layout className="flex h-screen">
    <Header
      style={headerStyle}
      className="h-full drop-shadow-sm overflow-hidden shadow-md shadow-[#f1f1ff]"
    >
      <AppHeader />
    </Header>
    <Layout hasSider className="flex-1 bg-white overflow-hidden">
      <Sider style={siderStyle}>{categorySider}</Sider>
      <Content>{content}</Content>
    </Layout>
    {/* {showFooter && <Footer className="text-center">{footer}</Footer>} */}
  </Layout>
)
