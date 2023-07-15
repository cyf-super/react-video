import request from '@/utils/request'

/**
 * 登陆
 * @param params
 * @returns
 */
export const loginService = async (params: Login.ParamsType) => {
  const res = await request.post('/api/login', params)

  return res
}

/**
 * 上传视频
 */
export const uploadVideoService = async (params: Uplaod.ParamsType) =>
  request.post('/api/upload', params.formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: params.onUploadProgress,
    cancelToken: params.source.token,
  })
