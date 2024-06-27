import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { LStorage } from '@cyf-super/utils'
import { toast } from 'sonner'
import { loginService } from '@/api/index'
import { userInfoStore } from '@/store/userInfoStore'

export const userInfoKey = 'userInfo'

export const useLogin = () => {
  const navigate = useNavigate()
  const { setUserInfo } = userInfoStore()

  const { mutate: login } = useMutation(loginService, {
    onSuccess: (res) => {
      console
      LStorage.set({
        key: '_token',
        value: res.token,
      })
      LStorage.set({
        key: userInfoKey,
        value: res.data,
      })
      setUserInfo(res.data)
      navigate('/')
      toast.success('登录成功')
    },
    onError(err) {
      console.error('登陆失败', err)
      toast.error('登陆失败')
    },
  })

  return {
    login,
  }
}
