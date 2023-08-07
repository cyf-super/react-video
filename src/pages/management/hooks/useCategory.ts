import { createElement, useEffect, useState } from 'react'
import type { MenuProps } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { LaptopOutlined } from '@ant-design/icons'
import { getCategories } from '@/api'

const menuActiveCSS = {
  backgroundColor: '#9555ff',
  color: '#fff',
  border: '2px #7131d9 solid',
}

function formatData(data: Category.Data[] | [], key: string) {
  return data.map((category) => ({
    key: `${category.categoryId}`,
    icon: createElement(LaptopOutlined),
    label: `${category.name}`,
    style: category.categoryId === key ? menuActiveCSS : {},
  }))
}

export const useGetCategory = () => {
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const [categories, setCategories] = useState<MenuProps['items']>([])
  const {
    data: res,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['category'],
    queryFn: getCategories,
  })
  const { data } = res || {}

  useEffect(() => {
    if (data) {
      const firstCategoryId = data?.categories[0].categoryId
      if (!categoryId) {
        navigate(`/manage/${firstCategoryId}`)
      }
      setCategories(
        formatData(
          data?.categories as Category.Data[],
          categoryId || firstCategoryId || ''
        )
      )
    }
  }, [categoryId, data, navigate])

  const clickMenuItem = (key: string = '') => {
    navigate(`/manage/${key}`)
  }

  return {
    categories,
    isLoading,
    isError,
    clickMenuItem,
  }
}
