import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { openNewTag } from '@cyf-super/utils'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export const SwiperComponent = ({
  list,
  className = '',
}: {
  list: Setting.SwiperType[]
  className?: string
}) => {
  const onClickImg = (href?: string) => {
    href && openNewTag(href)
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      loop
      autoplay
      pagination={{ clickable: true }}
    >
      {list.map((item) => (
        <SwiperSlide
          className={[
            'w-2/4 box-border aspect-video text-center',
            className,
          ].join(' ')}
          key={item.id}
          onClick={() => onClickImg(item.href)}
        >
          <img
            src={item.src}
            className="w-auto h-full object-cover mx-auto"
            alt=""
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
