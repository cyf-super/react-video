import request from '@/utils/request'

export const getFilesService = (params: File.GetFileParams) => {
  const { categoryId } = params
  return request.get<File.GetFileResponse, File.GetFileResponse>('/api/files', {
    params: {
      categoryId,
    },
  })
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
