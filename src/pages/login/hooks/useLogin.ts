import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { LStorage } from '@cyf-super/utils'
import { loginService } from '@/api/index'

export const useLogin = () => {
  const navigate = useNavigate()

  const { mutate: login } = useMutation(loginService, {
    onSuccess: (res) => {
      console.log('登陆成功', res)
      LStorage.set({
        key: '_token',
        value: res.token,
      })
      LStorage.set({
        key: 'userInfo',
        value: res.data,
      })
      navigate('/')
    },
    onError(err) {
      console.log('登陆失败', err)
    },
  })

  return {
    login,
  }
}
