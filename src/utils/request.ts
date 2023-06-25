import Axios, { InternalAxiosRequestConfig } from 'axios'
import { storage } from './storage'

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = storage.get('__token')
  if (token) {
    config.headers.authorization = token
  }

  config.headers.Accept = 'application/json'

  return config
}

const axios = Axios.create({
  baseURL: '',
  timeout: 10000,
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
