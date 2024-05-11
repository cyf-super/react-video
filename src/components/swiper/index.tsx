import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export interface SwiperItem {
  id: number
  src: string
  href?: string
}

export const SwiperComponent = ({ list }: { list: SwiperItem[] }) => {
  const onClickImg = (href?: string) => {
    href && window.open(href)
  }

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      navigation
      // pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {list.map((item) => (
        <SwiperSlide
          className="w-9/12 h-auto aspect-video text-center"
          key={item.id}
          onClick={() => onClickImg(item.href)}
        >
          <img src={item.src} className="w-auto h-full object-cover" alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
