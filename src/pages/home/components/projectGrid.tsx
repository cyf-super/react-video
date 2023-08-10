import { useState } from 'react'
// import { useSelector } from 'react-redux'
import { HeaderChannel } from './headerChannel'
import { Card } from './projectItem'
import { useCard } from '../hooks/useProject'

const gridDiv = `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 sm:gap-10`

export const ProjectGrid = () => {
  const [searchName, setSearchName] = useState('')
  const [categary, setCategary] = useState('全部文件')

  const { files } = useCard({
    categoryId: '83994e35-c027-475c-889c-ad159b6fa0a0',
  })

  return (
    <div className="mx-40">
      <HeaderChannel
        searchName={searchName}
        setSearchName={setSearchName}
        categary={categary}
        setCategary={setCategary}
      />
      <div className={gridDiv}>
        {files &&
          files.map((card: any) => (
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
