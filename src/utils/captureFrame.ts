import type { UploadFile } from 'antd'

interface DrawVideo {
  blob: Blob | null
  url: string
}

function drawVideo(video: HTMLVideoElement): Promise<DrawVideo> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    canvas.toBlob((blob) => {
      resolve({
        blob,
        url: URL.createObjectURL(<Blob>blob),
      })
      canvas.remove()
    })
  })
}

/**
 * 获取视频的第几帧
 */
export function createFrame(
  videoFile: UploadFile | File,
  timer = 0
): Promise<DrawVideo> {
  return new Promise((resolve) => {
    const video = document.createElement('video')
    video.currentTime = timer
    video.muted = true
    video.autoplay = true
    video.oncanplay = async () => {
      const frame = await drawVideo(video)
      resolve(frame)
      video.remove()
    }
    video.src = URL.createObjectURL(<File>videoFile)
  })
}
