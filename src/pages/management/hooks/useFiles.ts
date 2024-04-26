import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { useParams } from 'react-router-dom'
import { getFilesService, deleteFilesService, updateFileService } from '@/api'
import { formatFileData } from '@/utils/files'
import {
  removeFile,
  addFiles,
  setCount,
  selectFileIds,
  selectFiles,
  setSelectIds,
} from '@/store/slices/fileslice'
import { GetFunctionParams } from '@/utils/type'
import { queryClient } from '@/queryClient'

export type FileDataType = Pick<
  File.FileType,
  'type' | 'size' | 'name' | 'key'
> & {
  create: string
}

type GetFileType = GetFunctionParams<typeof getFilesService>[0]

export interface ParamsType {
  [key: string]: string
}

interface DeleteParamsType {
  fileIds: string[]
  fileNames: string[]
}

/**
 * 获取所有文件
 * @param categoryId：类别
 * @returns
 */
const useGetFile = ({ categoryId }: GetFileType) => {
  const [files, setFiles] = useState<File.FileType[]>([])
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
      setFiles(newData)
    }
  }, [data, dispatch])

  return {
    isLoading,
    files,
  }
}

/**
 * 文件操作
 * @returns
 */
const useHandleFile = () => {
  const { categoryId } = useParams()
  const dispatch = useDispatch()
  const fileIds = useSelector(selectFileIds)
  const files = useSelector(selectFiles)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showBatchDeleteModal, setShowBatchDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  // 删除 mutation
  const deleteMutation = useMutation({
    mutationFn: (params: DeleteParamsType) => deleteFilesService(params),
    onSuccess: (result) => {
      if (result.status) {
        toast.success(result.message)
      } else {
        toast.warning(result.message)
      }
    },
    onError: () => {
      toast.error('删除失败！')
    },
    onSettled() {
      queryClient.invalidateQueries(['getFile', categoryId])
    },
  })

  const updateMutation = useMutation({
    mutationFn: (params: ParamsType) => updateFileService(params),
    onSuccess: (result) => {
      if (result.status) {
        toast.success(result.message)
      } else {
        toast.warning(result.message)
      }
    },
    onError: () => {
      toast.error('更新失败！')
    },
    onSettled: () => {
      queryClient.invalidateQueries(['getFile', categoryId])
    },
  })

  // 删除文件
  const deleteFile = (file: File.FileType) => {
    dispatch(removeFile(file.fileId))
    setShowDeleteModal(false)
    deleteMutation.mutate({
      fileIds: [file.fileId],
      fileNames: [file.fileName],
    })
  }

  const deleteBatch = () => {
    const fileNames: string[] = []
    files.forEach((file) => {
      if (fileIds.includes(file.fileId)) {
        fileNames.push(file.fileName)
      }
    })
    setShowBatchDeleteModal(false)
    dispatch(setSelectIds([]))
    deleteMutation.mutate({
      fileIds,
      fileNames,
    })
  }

  const onBatchDelete = () => {
    if (!fileIds.length) {
      toast.warning('请选择文件～')
      return
    }
    setShowBatchDeleteModal(true)
  }

  // 更新文件信息
  const handleUpdate = (params: ParamsType) => {
    updateMutation.mutate(params)
  }

  // 下载文件
  const downloadFile = (file: File.FileType) => {
    console.log('🚀 ~ downloadFile ~ fileId:', file)
    const { size } = file
    console.log(':', size)
  }

  return {
    fileIds,
    showEditModal,
    showDeleteModal,
    showBatchDeleteModal,
    onBatchDelete,
    deleteBatch,
    deleteFile,
    handleUpdate,
    downloadFile,
    setShowDeleteModal,
    setShowEditModal,
    setShowBatchDeleteModal,
  }
}

export { useGetFile, useHandleFile }
