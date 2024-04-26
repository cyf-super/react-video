import { ParamsType } from '@/pages/management/hooks/useFiles'
import request from '@/utils/request'

/**
 * 获取单个文件信息
 * @param fileId
 * @returns
 */
export const getFileService = (fileId: string) =>
  request.get<File.FileType, File.FileType>('/file/', {
    params: {
      fileId,
    },
  })

/**
 * 获取类目下的文件
 * @param params
 * @returns
 */
export const getFilesService = (params: File.GetFilesParams) => {
  const { categoryId } = params
  return request.get<File.GetFilesResponse, File.GetFilesResponse>('/files', {
    params: {
      categoryId,
    },
  })
}

/**
 * 删除文件 -> 单个/批量
 * @param params
 * @returns
 */
export const deleteFilesService = (params: File.DeleteFilesParams) =>
  request.delete<File.DeleteFilesResponse, File.DeleteFilesResponse>('/files', {
    data: {
      ...params,
    },
  })

/**
 * 更改文件信息
 * @param params
 * @returns
 */
export const updateFileService = (params: ParamsType) =>
  request.put<File.DeleteFilesResponse, File.DeleteFilesResponse>(
    '/file',
    params
  )
