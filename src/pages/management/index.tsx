import { Toaster } from 'sonner'
import { useParams } from 'react-router-dom'
import { LayoutMan } from '../layout'
import { TableContent } from './tableContent'
import Setting from './setting'
import { CategorySider } from './components/categorySider'
import './css/style.css'

export default function Management() {
  const { categoryId } = useParams()
  const Content = categoryId === 'setting' ? Setting : TableContent

  return (
    <>
      <LayoutMan content={<Content />} categorySider={<CategorySider />} />
      <Toaster position="top-right" duration={2000} richColors />
    </>
  )
}
