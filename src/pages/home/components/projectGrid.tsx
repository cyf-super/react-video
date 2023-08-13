import { useState } from 'react'
// import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { HeaderChannel } from './headerChannel'
import { Card } from './projectItem'
import { useCard } from '../hooks/useProject'

const gridDiv = `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 sm:gap-10`

export const ProjectGrid = () => {
  const { categoryId } = useParams()
  const [searchName, setSearchName] = useState('')

  const { files } = useCard({
    categoryId: categoryId as string,
  })

  return (
    <div className="mx-40">
      <HeaderChannel searchName={searchName} setSearchName={setSearchName} />
      <div className={gridDiv}>
        {files &&
          files.map((card: any) => (
            <Card
              title={card.name}
              category={card.category}
              src={card.path}
              timer={dayjs(card.createdAt).format('YYYY-MM-DD HH:mm')}
              key={card.id}
            />
          ))}
      </div>
    </div>
  )
}
