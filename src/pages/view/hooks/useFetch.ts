import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getFileService } from '@/api/files'

export const useLoadFile = () => {
  const [notFindFile, setNotFindFile] = useState(false)
  const { fileId } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['file'],
    queryFn: () => getFileService(<string>fileId!),
    onSuccess: (res) => {
      if (!res.status) {
        setNotFindFile(true)
      }
    },
  })

  return {
    res: data,
    isLoading,
    notFindFile,
  }
}
