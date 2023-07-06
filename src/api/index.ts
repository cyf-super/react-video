import request from '@/utils/request'

/**
 * 登陆
 * @param params
 * @returns
 */
export const loginService = async (params: LoginParamsType) => {
  const res = await request.post('/api/login', params)
  return res
}
