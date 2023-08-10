import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getFilesService } from '@/api'
import { formatFileData } from '@/utils/files'

export const useCard = (options: File.GetFileParams) => {
  const [files, setFiles] = useState<File.FileType[]>([])
  const [count, setCount] = useState<number>(0)

  const { data: res, isLoading } = useQuery({
    queryKey: ['files'],
    queryFn: () => getFilesService(options),
  })

  useEffect(() => {
    if (res) {
      const formatData = formatFileData(res.data.files)
      setFiles(formatData)
      setCount(res.data.count)
    }
  }, [res])

  return {
    files,
    count,
    isLoading,
  }
}
