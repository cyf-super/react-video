import { useSelector } from 'react-redux'
import { HeaderChannel } from './headerChannel'
import { Card } from './projectItem'
import { selectFiles } from '@/store/slices/fileslice'

export const ProjectGrid = () => {
  const fileData = useSelector(selectFiles)
  return (
    <div className="mx-40">
      <HeaderChannel />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 sm:gap-10">
        {fileData &&
          fileData.map((card: any) => (
            <Card
              title={card.name}
              category={card.category}
              src={card.path}
              timer={card.timer}
              key={card.id}
            />
          ))}
      </div>
    </div>
  )
}
