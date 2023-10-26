import { LayoutMan } from '../layout'
import { Content } from './components/content'
import { useGetCategory } from './hooks/useCategory'
import './style.css'

export default function Management() {
  const { data, clickMenuItem } = useGetCategory()

  return (
    <LayoutMan
      sideMemu={data || []}
      clickMenuItem={clickMenuItem}
      content={<Content />}
    />
  )
}
