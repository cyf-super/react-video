import { memo, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Pagination } from 'antd'
import { HeaderChannel } from './headerChannel'
import { Card } from './projectItem'
import { useCard } from '../hooks/useProject'
import { debounce } from '@/utils/tools'
import { queryClient } from '@/queryClient'
import { ScaleBox } from '@/components/animation/scaleBox'
import { IntersectionObserver } from '@/components/observer'

const gridDiv = `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 sm:gap-10`

export const ProjectGrid = memo(() => {
  const { categoryId } = useParams()

  const [searchName, setSearchName] = useState('')
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 10,
    currentPage: 1,
  })
  const name = useRef('')

  const { files } = useCard({
    categoryId: categoryId as string,
    pageSize: pagination.pageSize,
    currentPage: pagination.currentPage,
    name: name.current,
  })

  const searchFile = debounce(() => {
    queryClient.invalidateQueries(['files'])
  })

  useEffect(() => {
    name.current = searchName
    searchFile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchName])

  const onChange = (page: number, pageSize: number) => {
    setPagination({
      ...pagination,
      currentPage: page,
      pageSize,
    })
  }
  return (
    <div className="mx-20">
      {files?.length && (
        <HeaderChannel searchName={searchName} setSearchName={setSearchName} />
      )}
      <IntersectionObserver>
        <ScaleBox className={gridDiv}>
          {files?.length
            ? files.map((card) => <Card file={card} key={card.fileId} />)
            : null}
        </ScaleBox>
      </IntersectionObserver>

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
})
