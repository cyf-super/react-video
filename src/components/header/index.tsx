import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { HeaderCSS } from './style'

interface InputChange {
  (e: string): void
}

interface HeaderProps {
  searchV: string
  inputChange: InputChange
}

export default function Header(props: HeaderProps) {
  const { searchV, inputChange } = props
  return (
    <HeaderCSS>
      <div className="search">
        <Input
          size="large"
          placeholder="Search for what you want"
          prefix={<SearchOutlined />}
          value={searchV}
          onChange={(e) => inputChange(e.target.value)}
        />
      </div>
    </HeaderCSS>
  )
}
