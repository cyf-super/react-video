import request from '@/utils/request'

/**
 * 上传视频
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
