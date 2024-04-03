import { Toaster } from 'sonner'
import { LayoutMan } from '../layout'
import { Content } from './components/content'
import { CategorySider } from './components/categorySider'
import './style.css'

export default function Management() {
  return (
    <>
      <LayoutMan content={<Content />} categorySider={<CategorySider />} />
      <Toaster position="top-right" duration={2000} richColors />
    </>
  )
}
