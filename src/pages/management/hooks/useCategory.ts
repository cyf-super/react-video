import { createElement, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { LaptopOutlined } from '@ant-design/icons'
import { getCategories } from '@/api'

const menuActiveCSS = {
  backgroundColor: '#9555ff',
  color: '#fff',
  border: '2px #7131d9 solid',
}

export const useGetCategory = () => {
  const navigate = useNavigate()
  const { categoryId } = useParams()

  const formatData = useCallback(
    (key: string) =>
      function (data: Awaited<ReturnType<typeof getCategories>>) {
        const firstCategoryId = data.data?.categories[0].categoryId
        if (!key) {
          navigate(`/manage/${firstCategoryId}`)
        }
        return data.data.categories.map((category) => ({
          key: `${category.categoryId}`,
          icon: createElement(LaptopOutlined),
          label: `${category.name}`,
          style: category.categoryId === key ? menuActiveCSS : {},
        }))
      },
    [navigate]
  )
  const { data, isError, isLoading } = useQuery({
    queryKey: ['category'],
    queryFn: getCategories,
    select: formatData(<string>categoryId),
  })

  const clickMenuItem = (key: string = '') => {
    navigate(`/manage/${key}`)
  }

  return {
    data,
    isLoading,
    isError,
    clickMenuItem,
  }
}
