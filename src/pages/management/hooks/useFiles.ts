import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from 'dayjs'
import { formatBytes } from '@cyf-super/utils'
import { getFilesService } from '@/api'
import { sliceNameType } from '@/utils/tools'

export type FileDataType = Pick<
  File.FileType,
  'type' | 'size' | 'name' | 'key'
> & {
  create: string
}

function formatData(files: File.FileType[]) {
  return files.map((file) => ({
    key: file.id,
    type: file.type,
    create: dayjs(file.createdAt).format('YYYY-MM-DD HH:mm'),
    size: formatBytes(<number>file.size),
    name: sliceNameType(file.name)[0] || '',
  }))
}

export const useGetFile = ({ categoryId }: File.GetFileParams) => {
  const [fileData, setFileData] = useState<FileDataType[]>([])
  const { data, isLoading } = useQuery({
    queryKey: ['getFile'],
    queryFn: async () => getFilesService({ categoryId }),
  })

  useEffect(() => {
    if (data) {
      const newData = formatData(data.data.files)
      setFileData(newData)
    }
  }, [data])

  return {
    fileData,
    count: data?.data.count || 0,
    isLoading,
  }
}

export function deleteFile() {}
