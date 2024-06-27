import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import { getSwiperService } from '@/api'
import { SwiperComponent } from '@/components/swiper'
import { FadeInUpBox } from '@/components/animation/fadeInUpBox'
import { IntersectionObserver } from '@/components/observer'

const HomeSwiper = memo(() => {
  const { data } = useQuery({
    queryFn: getSwiperService,
    queryKey: ['swiper'],
  })

  const list = data?.data || []
  return (
    <IntersectionObserver>
      <FadeInUpBox className="mx-20 mt-10">
        <SwiperComponent list={list} />
      </FadeInUpBox>
    </IntersectionObserver>
  )
})

export default HomeSwiper
