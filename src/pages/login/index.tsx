import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FireTwoTone, SafetyCertificateTwoTone } from '@ant-design/icons'
import { Input, Checkbox, Button } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { LoginBC, ModalFrame } from './style'
import bgUrl from '../../assets/bc3.jpg'
import logo from '../../assets/logo.webp'
import { storage } from '@/utils/storage'

function LoginForm() {
  const navigate = useNavigate()

  const [checked, setChecked] = useState(storage.get('_checked') || false)
  const [info, setInfo] = useState({
    userName: storage.get('_info')?.userName || '',
    password: storage.get('_info')?.password || '',
  })

  useEffect(() => {
    if (checked) {
      storage.set('_info', info)
    } else {
      storage.remove('_info')
    }
  }, [checked, info])

  const changeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({ ...info, userName: e.target.value })
  }

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({ ...info, password: e.target.value })
  }

  const changeBox = (e: CheckboxChangeEvent) => {
    const check = e.target.checked
    setChecked(check)
    storage.set('_checked', check)
  }

  const enterLogin = () => {
    console.log(info)
    if (info.userName === 'admin' && info.password === '123456') {
      navigate('/')
    }
  }

  return (
    <div className="form">
      <div className="username">
        <Input
          size="large"
          placeholder="账号"
          prefix={<FireTwoTone />}
          value={info.userName}
          onChange={changeUserName}
        />
      </div>
      <br />
      <div className="password">
        <Input
          size="large"
          placeholder="密码"
          prefix={<SafetyCertificateTwoTone />}
          value={info.password}
          onChange={changePassword}
        />
      </div>
      <br />
      <Checkbox onChange={changeBox} checked={checked}>
        记住密码
      </Checkbox>
      <div>
        <Button size="large" type="primary" onClick={enterLogin}>
          登陆
        </Button>
      </div>
    </div>
  )
}

export default function Login() {
  return (
    <>
      <LoginBC>
        <img src={bgUrl} alt="" />
      </LoginBC>

      <ModalFrame>
        <img className="logo" src={logo} alt="" />
        <div className="main">
          <h2>数学课堂</h2>
          <br />
          <LoginForm />
        </div>
      </ModalFrame>
    </>
  )
}
