import { useEffect } from 'react'
import Plyr from 'plyr-react'
import 'plyr-react/plyr.css'
import { useVideo } from '../hooks/useLoadVideo'
import { useLoadFile } from '../hooks/useFetch'

const videoOptions = {
  // autoplay: true,
  volume: 0.1,
}

export const PlyrVideo = () => {
  const { ref, loadVideo } = useVideo()
  const { file, isLoading } = useLoadFile()
  useEffect(() => {
    if (file?.path) {
      loadVideo(file.path)
    }
  }, [loadVideo, file])

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
      {!isLoading && <div className="w-4/6">{plyrVideo}</div>}
    </div>
  )
}
