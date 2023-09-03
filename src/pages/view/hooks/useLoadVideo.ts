import { useCallback, useRef } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import Hls from 'hls.js'
import { PlyrInstance, APITypes } from 'plyr-react'

export const useVideo = () => {
  const ref = useRef<APITypes>(null)

  const loadVideo = useCallback((src: string) => {
    const video = document.getElementById('plyr') as HTMLVideoElement
    const hls = new Hls()
    hls.loadSource(src)
    hls.attachMedia(video)
    // @ts-ignore
    ref.current!.plyr.media = video

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      ;(ref.current!.plyr as PlyrInstance).play()
    })
  }, [])

  const enterVideo = () => {
    ;(ref.current?.plyr as Plyr)?.fullscreen.enter()
  }

  return {
    ref,
    loadVideo,
    enterVideo,
  }
}
