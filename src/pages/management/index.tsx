import { Toaster } from 'sonner'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { LayoutMan } from '../layout'
import { TableContent } from './tableContent'
import Setting from './setting'
import { CategorySider } from './components/categorySider'
import './css/style.css'
import { useCategory } from './hooks/useCategory'
import { getCategories } from '@/api'

export default function Management() {
  const { categoryId } = useParams()
  const Content = categoryId === 'setting' ? Setting : TableContent

  const { formatData } = useCategory()
  const { data } = useQuery({
    queryKey: ['category'],
    queryFn: getCategories,
    select: formatData(categoryId as string),
  })

  return (
    <>
      <LayoutMan
        content={<Content />}
        categorySider={<CategorySider data={data!} />}
      />
      <Toaster position="top-right" duration={2000} richColors />
    </>
  )
}
