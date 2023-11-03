import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch } from 'react-redux'
import { getFilesService, deleteFilesService } from '@/api'
import { formatFileData } from '@/utils/files'
import { removeFile, addFiles, setCount } from '@/store/slices/fileslice'
import { FormatFileDataType, GetFunctionParams } from '@/utils/type'

export type FileDataType = Pick<
  File.FileType,
  'type' | 'size' | 'name' | 'key'
> & {
  create: string
}

type GetFileType = GetFunctionParams<typeof getFilesService>[0]

/**
 * 获取所有文件
 * @param categoryId：类别
 * @returns
 */
const useGetFile = ({ categoryId }: GetFileType) => {
  const dispatch = useDispatch()
  const { data, isLoading } = useQuery({
    queryKey: ['getFile', categoryId],
    queryFn: async () => getFilesService({ categoryId }),
    enabled: !!categoryId,
  })

  useEffect(() => {
    if (data) {
      const newData = formatFileData(data.data.files)
      dispatch(addFiles(newData))
      dispatch(setCount(data.data?.count))
    }
  }, [data, dispatch])

  return {
    isLoading,
  }
}

/**
 * 文件操作
 * @returns
 */
const useHandleFile = () => {
  const dispatch = useDispatch()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // 删除文件
  const deleteFile = (fileId: string) => {
    dispatch(removeFile(fileId))
    setShowDeleteModal(false)
    deleteFilesService({
      fileIds: [fileId],
    })
  }

  // 下载文件
  const downloadFile = (file: FormatFileDataType) => {
    console.log('🚀 ~ downloadFile ~ fileId:', file)
    const size = file.originSize
    console.log(':', size)
  }

  return {
    showDeleteModal,
    deleteFile,
    downloadFile,
    setShowDeleteModal,
  }
}

export { useGetFile, useHandleFile }
