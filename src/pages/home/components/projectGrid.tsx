import { useState } from 'react'
// import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Pagination } from 'antd'
import { HeaderChannel } from './headerChannel'
import { Card } from './projectItem'
import { useCard } from '../hooks/useProject'

const gridDiv = `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 sm:gap-10`

export const ProjectGrid = () => {
  const { categoryId } = useParams()
  const [searchName, setSearchName] = useState('')
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 10,
    currentPage: 1,
  })

  const { files } = useCard({
    categoryId: categoryId as string,
    pageSize: pagination.pageSize,
    currentPage: pagination.currentPage,
  })

  const onChange = (page: number, pageSize: number) => {
    setPagination({
      ...pagination,
      currentPage: page,
      pageSize,
    })
  }
  return (
    <div className="mx-20">
      <HeaderChannel searchName={searchName} setSearchName={setSearchName} />
      <div className={gridDiv}>
        {files &&
          files.map((card) => <Card file={card} key={card.categoryId} />)}
      </div>
      <div className="text-right my-4">
        <Pagination
          defaultCurrent={1}
          current={pagination.currentPage}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onChange={onChange}
        />
      </div>
    </div>
  )
}
