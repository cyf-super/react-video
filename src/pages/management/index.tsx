import { Toaster } from 'sonner'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { LayoutMan } from '../layout'
import { Content } from './content'
import { CategorySider } from './components/categorySider'
import './style.css'
import { useCategory } from './hooks/useCategory'
import { getCategories } from '@/api'

export default function Management() {
  const { categoryId } = useParams()

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
