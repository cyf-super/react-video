import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from 'dayjs'
import { formatBytes } from '@cyf-super/utils'
import { useDispatch } from 'react-redux'
import { getFilesService } from '@/api'
import { sliceNameType } from '@/utils/tools'
import { removeFile, addFiles, setCount } from '@/store/slices/fileslice'

export type FileDataType = Pick<
  File.FileType,
  'type' | 'size' | 'name' | 'key'
> & {
  create: string
}

function formatData(files: File.FileType[]) {
  return files.map((file) => ({
    ...file,
    key: file.fileId,
    type: file.type,
    create: dayjs(file.createdAt).format('YYYY-MM-DD HH:mm'),
    size: formatBytes(<number>file.size),
    name: sliceNameType(file.name)[0] || '',
  }))
}

const useGetFile = ({ categoryId }: File.GetFileParams) => {
  const dispatch = useDispatch()
  const { data, isLoading } = useQuery({
    queryKey: ['getFile', categoryId],
    queryFn: async () => getFilesService({ categoryId }),
    enabled: !!categoryId,
  })

  useEffect(() => {
    if (data) {
      const newData = formatData(data.data.files)
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
  const [showDelIcon, setShowDelIcon] = useState(false)

  const deleteFile = (fileId: string) => {
    dispatch(removeFile(fileId))
    setShowDelIcon(false)
  }

  return {
    deleteFile,
    showDelIcon,
    setShowDelIcon,
  }
}

export { useGetFile, useHandleFile }
