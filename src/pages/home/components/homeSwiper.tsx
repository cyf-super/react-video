import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { getSwiperService } from '@/api'
import { SwiperComponent } from '@/components/swiper'

const HomeSwiper = memo(() => {
  const { data } = useQuery({
    queryFn: getSwiperService,
    queryKey: ['swiper'],
  })

  const list = data?.data.swiper || []
  return (
    <div className="mx-20">
      <SwiperComponent list={list} />
    </div>
  )
})

export default HomeSwiper
