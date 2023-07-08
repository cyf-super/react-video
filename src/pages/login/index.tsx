import { useState, useEffect } from 'react'
import { FireTwoTone, SafetyCertificateTwoTone } from '@ant-design/icons'
import { Input, Checkbox, Button } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
// import { LoginBC, ModalFrame } from './style'
// import bgUrl from '../../assets/bc3.jpg'
import { motion } from 'framer-motion'
import logo from '../../assets/logo.webp'
import { storage } from '@/utils/storage'
import { useLogin } from './hooks/useLogin'

function LoginForm() {
  const [checked, setChecked] = useState(storage.get('_checked') || false)
  const [info, setInfo] = useState({
    username: storage.get('_info')?.username || '',
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
    setInfo({ ...info, username: e.target.value })
  }

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({ ...info, password: e.target.value })
  }

  const changeBox = (e: CheckboxChangeEvent) => {
    const check = e.target.checked
    setChecked(check)
    storage.set('_checked', check)
  }

  const { login } = useLogin()
  const enterLogin = () => {
    console.log(info)
    login(info)
  }

  return (
    <div className="flex-col-center">
      <div className="username">
        <Input
          size="large"
          placeholder="账号"
          prefix={<FireTwoTone />}
          value={info.username}
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
      <div className="w-full mt-9">
        <Button className="w-full" size="large" onClick={enterLogin}>
          登陆
        </Button>
      </div>
    </div>
  )
}

export default function Login() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
      className="container flex-col-center"
    >
      {/* <LoginBC>
        <img src={bgUrl} alt="" />
      </LoginBC> */}

      <div className="flex-col-center w-full sm:flex-row absolute-center">
        <img
          className="max-sm:mt-23 max-sm:mb-24 w-1/3 max-w-xs"
          src={logo}
          alt=""
        />
        <div className="flex-col-center w-96">
          <h2 className="text-3xl italic font-bold">数学课堂</h2>
          <br />
          <LoginForm />
        </div>
      </div>
    </motion.section>
  )
}
