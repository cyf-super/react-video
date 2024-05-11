import { useState } from 'react'
import { SwiperItem } from '@/components/swiper'
import { blobToBase64 } from '@/utils/files'

type StatusType = 'editing' | 'loading' | 'default'

const defaultImageNums = 5

export function useHomeStting() {
  const [list, setList] = useState<SwiperItem[]>([])
  const [status, setSatus] = useState<StatusType>('default')

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    if (!files) return

    const images = Object.values(files).filter((file) =>
      file.type.startsWith('image/')
    )
    const newList = [...list]
    let arrImage = images
    const needNums = defaultImageNums - list.length
    if (images.length > needNums) {
      arrImage = images.slice(0, needNums)
    }

    for (let i = 0; i < arrImage.length; i += 1) {
      const base64 = await blobToBase64(arrImage[i])
      newList.push({
        id: Date.now(),
        src: base64,
      })
    }
    setList(newList)
    event.target.value = ''
  }

  return {
    list,
    status,
    setList,
    onFileChange,
  }
}
