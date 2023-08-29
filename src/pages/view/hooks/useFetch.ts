import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getFileService } from '@/api/files'

export const useLoadFile = () => {
  const [notFindFile, setNotFindFile] = useState(false)
  const { fileId } = useParams()

  const { data: file, isLoading } = useQuery({
    queryKey: ['file'],
    queryFn: () => getFileService(<string>fileId),
    onSuccess: (res) => {
      if ((res as unknown as File.GetFileResponse).code !== 0) {
        setNotFindFile(true)
      }
    },
    onSettled: (res) => (res as unknown as File.GetFileResponse)?.data,
  })

  return {
    file,
    isLoading,
    notFindFile,
  }
}
