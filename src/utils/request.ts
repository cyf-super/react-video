import { redirect } from 'react-router-dom'
import Axios, { InternalAxiosRequestConfig } from 'axios'
import { LStorage } from '@cyf-super/utils'

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = LStorage.get('_token')
  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }

  config.headers.Accept = 'application/json'

  return config
}

const axios = Axios.create({
  baseURL: '',
  timeout: 100_000,
  withCredentials: false,
})

axios.interceptors.request.use(authRequestInterceptor)
axios.interceptors.response.use(
  (response) => {
    console.log('🚀 ~ response.data:', response.data)

    return response.data
  },
  (error) => {
    const message = error.response?.data?.message || error.message
    console.log('message ', message.status)
    console.error(message)
    if (message.status) {
      redirect('/login')
    }
    return Promise.reject(message)
  }
)

export default axios
