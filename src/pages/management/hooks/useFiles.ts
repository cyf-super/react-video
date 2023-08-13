import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch } from 'react-redux'
import { getFilesService, deleteFilesService } from '@/api'
import { formatFileData } from '@/utils/files'
import { removeFile, addFiles, setCount } from '@/store/slices/fileslice'
import { GetFunctionParams } from '@/utils/type'

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
      console.log('🚀 ~ useEffect ~ newData:', newData)
      dispatch(addFiles(newData))
      dispatch(setCount(data.data?.count))
    }
  }, [data, dispatch])

  return {
    isLoading,
  }
}

const useHandleFile = () => {
  const dispatch = useDispatch()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const deleteFile = (fileId: string) => {
    dispatch(removeFile(fileId))
    setShowDeleteModal(false)
    deleteFilesService({
      fileIds: [fileId],
    })
  }

  return {
    deleteFile,
    showDeleteModal,
    setShowDeleteModal,
  }
}

export { useGetFile, useHandleFile }
