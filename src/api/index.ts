import request from '@/utils/request'

/**
 * 登陆
 * @param params
 * @returns
 */
export const loginService = async (params: Login.Params) =>
  request.post<Login.Response, Login.Response>('/login', params)

/**
 * 上传视频
 */
export const uploadVideoService = async (params: Uplaod.Params) =>
  request.post<Uplaod.Response, Uplaod.Response>('/upload', params.formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: params.onUploadProgress,
    cancelToken: params.source.token,
  })

export * from './category'
export * from './files'
export * from './setting'
