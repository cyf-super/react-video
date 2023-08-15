import { useRef } from 'react'
import Plyr, { APITypes } from 'plyr-react'
import 'plyr-react/plyr.css'

const videoOptions = undefined

export const PlyrVideo = () => {
  const ref = useRef<APITypes>(null)

  const enterVideo = () => {
    ;(ref.current?.plyr as Plyr)?.fullscreen.enter()
  }

  const make2x = () => {
    const plyrInstance = ref.current?.plyr as Plyr
    if (plyrInstance) plyrInstance.speed = 2
  }

  const plyrVideo = (
    <Plyr
      ref={ref}
      source={{
        type: 'video',
        sources: [
          {
            src: '/video/1692022900272.[4849]%20%E5%BC%80%E7%AF%87%E8%AF%8D%20%20%E8%BF%99%E4%B8%80%E6%AC%A1%EF%BC%8C%E7%9C%9F%E6%AD%A3%E5%90%83%E9%80%8F%20React%20%E7%9F%A5%E8%AF%86%E9%93%BE%E8%B7%AF%E4%B8%8E%E5%BA%95%E5%B1%82%E9%80%BB%E8%BE%91.mp4',
          },
        ],
      }}
      options={videoOptions}
    />
  )

  return (
    <div className="flex-col-center w-fu">
      <div className="w-4/6">{plyrVideo}</div>
      <button type="button" onClick={enterVideo}>
        fullscreen
      </button>
      <button type="button" onClick={make2x}>
        2x
      </button>
    </div>
  )
}
