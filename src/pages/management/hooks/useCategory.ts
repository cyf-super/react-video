import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  createCategory,
  deleteCategory,
  getCategories,
  swapCategory,
  updateCategory,
} from '@/api'
import { queryClient } from '@/queryClient'

export const useCategory = () => {
  const navigate = useNavigate()
  const { categoryId } = useParams()

  const [categoryList, setCategoryList] = useState<Category.Data[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showInputModal, setShowInputModal] = useState(false)

  const idRef = useRef('')
  const isSetting = categoryId === 'setting'

  const formatData = useCallback(
    (key: string) =>
      function (data: Awaited<ReturnType<typeof getCategories>>) {
        const firstCategoryId = data.data?.categories[0].categoryId
        if (!key) {
          navigate(`/manage/${firstCategoryId}`)
        }
        return data.data.categories.map((categoriy) => ({
          ...categoriy,
          id: categoriy.categoryId,
        }))
      },
    []
  )

  const { data } = useQuery({
    queryKey: ['category'],
    queryFn: getCategories,
    select: formatData(categoryId as string),
  })

  useEffect(() => {
    if (data) {
      setCategoryList(structuredClone(data))
    }
  }, [data])

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
      if (result.status === false) {
        toast.error(result.message)
        return
      }
      queryClient.invalidateQueries({ queryKey: ['category'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess(result) {
      if (result.status === false) {
        toast.error(result.message)
        return
      }
      queryClient.invalidateQueries({
        queryKey: ['category'],
      })
    },
  })

  const swapMutation = useMutation({
    mutationFn: (categoryIds: string[]) => swapCategory(categoryIds),
    onSuccess(result) {
      if (!result.status) {
        toast.error(result.message)
      }
    },
  })

  const clickMenuItem = (key: string = '') => {
    navigate(`/manage/${key}`)
  }

  // 删除类别
  const handleDelete = () => {
    deleteMutation.mutate(idRef.current)
    setShowDeleteModal(false)
  }

  // 创建类别
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

  // 拖拽交换顺序
  const onChangeCateory = (list: Category.Data[]) => {
    setCategoryList(list)
    const ids = list.map((item) => item.categoryId)
    swapMutation.mutate(ids)
  }

  return {
    showInputModal,
    showDeleteModal,
    createMutation,
    idRef,
    isSetting,
    categoryList,
    onChangeCateory,
    navigate,
    clickMenuItem,
    formatData,
    setShowDeleteModal,
    setShowInputModal,
    createCategoryFunc,
    handleDelete,
  }
}
