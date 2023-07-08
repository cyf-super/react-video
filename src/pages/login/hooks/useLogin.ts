import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { loginService } from '@/api/index'

export const useLogin = () => {
  const navigate = useNavigate()

  const { mutate: login } = useMutation(loginService, {
    onSuccess: () => {
      console.log('登陆成功')
      navigate('/')
    },
    onError() {
      console.log('登陆失败')
    },
  })

  return {
    login,
  }
}
