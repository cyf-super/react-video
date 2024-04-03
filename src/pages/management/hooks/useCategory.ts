import { useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '@/api'

export const useCategory = () => {
  const navigate = useNavigate()
  const { categoryId } = useParams()

  const queryClient = new QueryClient()

  const formatData = useCallback(
    (key: string) =>
      function (data: Awaited<ReturnType<typeof getCategories>>) {
        const firstCategoryId = data.data?.categories[0].categoryId
        if (!key) {
          navigate(`/manage/${firstCategoryId}`)
        }
        return data.data.categories
      },
    []
  )
  const { data, isError, isLoading } = useQuery({
    queryKey: ['category'],
    queryFn: getCategories,
    select: formatData(<string>categoryId),
  })

  const createMutation = useMutation({
    mutationFn: (name: string) => createCategory(name),
    onSuccess: async (result) => {
      if (result.code === '11001') {
        toast.error(result.message)
        return
      }

      await queryClient.invalidateQueries({ queryKey: ['category'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateCategory(id, name),
    onSuccess: async (result) => {
      if (result.code === '11001') {
        toast.error(result.message)
        return
      }
      await queryClient.invalidateQueries({ queryKey: ['category'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess(result) {
      if (result.code === '11001') {
        toast.error(result.message)
        return
      }
      queryClient.invalidateQueries({ queryKey: ['category'] })
    },
  })

  const clickMenuItem = (key: string = '') => {
    navigate(`/manage/${key}`)
  }

  return {
    data,
    isLoading,
    isError,
    createMutation,
    updateMutation,
    deleteMutation,
    clickMenuItem,
  }
}
