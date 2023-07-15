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
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message
    console.error(message)
    return Promise.reject(error)
  }
)

export default axios
