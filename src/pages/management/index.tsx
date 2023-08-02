import { LayoutMan } from '../layout'
import { Content } from './components/content'
import { useGetCategory } from './hooks/useCategory'
import './style.css'

export default function Management() {
  const { categories, clickMenuItem } = useGetCategory()
  console.log(333333)

  return (
    <LayoutMan
      sideMemu={categories}
      clickMenuItem={clickMenuItem}
      content={<Content />}
    />
  )
}
