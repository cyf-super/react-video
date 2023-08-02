import { ReactNode } from 'react'
import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import { AppHeader } from './header'
import './style.module.css'

const { Header, Sider, Content } = Layout
const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  height: 100,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#fff',
}

const siderStyle: React.CSSProperties = {
  lineHeight: '120px',
  backgroundColor: '#F7F7F7',
}

interface LayoutParamsType {
  sideMemu: MenuProps['items']
  clickMenuItem: (key: string) => void
  content: ReactNode
}

export const LayoutMan = ({
  sideMemu,
  clickMenuItem,
  content,
}: LayoutParamsType) => (
  <Layout className="flex h-screen">
    <Header
      style={headerStyle}
      className="h-full drop-shadow-sm overflow-hidden"
    >
      <AppHeader />
    </Header>
    <Layout hasSider className="flex-1 bg-white overflow-hidden">
      <Sider style={siderStyle}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: '100%', borderRight: 0 }}
          items={sideMemu}
          onClick={(menuInfo) => clickMenuItem(menuInfo.key)}
        />
      </Sider>
      <Content>{content}</Content>
    </Layout>
    {/* {showFooter && <Footer className="text-center">{footer}</Footer>} */}
  </Layout>
)
