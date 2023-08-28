import { useEffect } from 'react'
import Plyr from 'plyr-react'
import 'plyr-react/plyr.css'
import { useVideo } from '../hooks/useLoadVideo'

const videoOptions = {
  // autoplay: true,
  volume: 0.1,
}

export const PlyrVideo = () => {
  const { ref, loadVideo } = useVideo()

  useEffect(() => {
    loadVideo('/ffmpeg/1693178566333/index.m3u8')
  }, [loadVideo])

  const plyrVideo = (
    <Plyr
      id="plyr"
      ref={ref}
      source={{} as Plyr.SourceInfo}
      options={videoOptions}
    />
  )

  return (
    <div className="flex-col-center w-fu">
      <div className="w-4/6">{plyrVideo}</div>
    </div>
  )
}
