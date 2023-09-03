import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '@/api/category'
import { getFilesService } from '@/api'
import { formatFileData } from '@/utils/files'

export interface CategoryOptions {
  label: string
  value: string
  id: string
}

export const useCard = (options: File.GetFilesParams) => {
  const [files, setFiles] = useState<File.FileType[]>([])
  const [count, setCount] = useState<number>(0)
  const { categoryId } = options

  const { data: res, isLoading } = useQuery({
    queryKey: ['files', categoryId],
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

export const useSelect = () => {
  const [categores, setCategory] = useState<CategoryOptions[]>([])
  const { data: res, isLoading } = useQuery({
    queryKey: ['selectCat'],
    queryFn: () => getCategories(),
  })

  useEffect(() => {
    if (res) {
      const { categories } = res.data
      const newCategories = categories.map((categoriy) => ({
        label: categoriy.name,
        value: categoriy.name,
        id: categoriy.categoryId,
      }))

      setCategory(newCategories)
    }
  }, [res])

  return {
    isLoading,
    categores,
  }
}
