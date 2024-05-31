import request from '@/utils/request'

/**
 * 上传轮播图
 */
export const uploadSwiperService = async (params: Setting.SwiperUploadParams) =>
  request.post<Setting.SwiperUploadResponse, Setting.SwiperUploadResponse>(
    '/setting-swiper',
    params.formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )

/**
 *  获取轮播图
 * @returns
 */
export const getSwiperService = async () =>
  request.get<Setting.GetSwiperReponse, Setting.GetSwiperReponse>(
    '/setting-swiper'
  )

/**
 * 获取网站信息
 */
export const getWebsiteApi = async () =>
  request.get<Setting.WebsiteInfoResponse, Setting.WebsiteInfoResponse>(
    'website-info'
  )

/**
 * 更新用户信息
 * @param params
 * @returns
 */
export const updateUserInfo = async (params: FormData) =>
  request.post<Setting.UserInfoResponse, Setting.UserInfoResponse>(
    '/user-info',
    params
  )

/**
 * 修改网站信息
 * @param params
 * @returns
 */
export const updateWebsiteInfApi = async (params: FormData) =>
  request.post<Setting.WebsiteInfoResponse, Setting.WebsiteInfoResponse>(
    '/website-info',
    params
  )
