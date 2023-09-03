import request from '@/utils/request'

export const getFileService = (fileId: string) =>
  request.get<File.FileType, File.FileType>('/api/file/', {
    params: {
      fileId,
    },
  })

export const getFilesService = (params: File.GetFilesParams) => {
  const { categoryId } = params
  return request.get<File.GetFilesResponse, File.GetFilesResponse>(
    '/api/files',
    {
      params: {
        categoryId,
      },
    }
  )
}

export const deleteFilesService = (params: File.DeleteFilesParams) =>
  request.delete<File.DeleteFilesResponse, File.DeleteFilesResponse>(
    '/api/files',
    {
      data: {
        ...params,
      },
    }
  )
