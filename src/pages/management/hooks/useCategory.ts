import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '@/api'
import { queryClient } from '@/queryClient/index'

export const useCategory = () => {
  const navigate = useNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showInputModal, setShowInputModal] = useState(false)
  const idRef = useRef('')

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

  const createMutation = useMutation({
    mutationFn: (name: string) => createCategory(name),
    onSuccess: async (result) => {
      if (result.code === '11001') {
        toast.error(result.message)
        return
      }
      queryClient.invalidateQueries({ queryKey: ['category'] })
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
      queryClient.invalidateQueries({ queryKey: ['category'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess(result) {
      if (result.code === '11001') {
        toast.error(result.message)
        return
      }
      queryClient.invalidateQueries({
        queryKey: ['category'],
      })
    },
  })

  const clickMenuItem = (key: string = '') => {
    navigate(`/manage/${key}`)
  }

  const handleDelete = () => {
    deleteMutation.mutate(idRef.current)
    setShowDeleteModal(false)
  }

  const createCategoryFunc = (name?: string) => {
    if (!name?.trim()) {
      toast.warning('名称不能为空~')
      return
    }
    updateMutation.mutate({
      id: idRef.current,
      name,
    })
    setShowInputModal(false)
  }

  return {
    showInputModal,
    showDeleteModal,
    createMutation,
    idRef,
    clickMenuItem,
    formatData,
    setShowDeleteModal,
    setShowInputModal,
    createCategoryFunc,
    handleDelete,
  }
}
