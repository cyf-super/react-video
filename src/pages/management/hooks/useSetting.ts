import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { blobToBase64 } from '@/utils/files'
import { getSwiperService, uploadSwiperService } from '@/api'
import { isBase64 } from '@/utils/tools'

type StatusType = 'editing' | 'loading' | 'default'

export const defaultImageNums = 10

export function useHomeStting() {
  const [list, setList] = useState<Setting.SwiperType[]>([])
  const [status, setSatus] = useState<StatusType>('default')
  const swiperImages = useRef<File[]>([])
  const [itemImage, setItemImage] = useState<Setting.SwiperType | null>(null)

  const initListRef = useRef<Setting.SwiperType[]>([])

  const { data } = useQuery({
    queryFn: getSwiperService,
    queryKey: ['swiper'],
  })

  useEffect(() => {
    if (data?.data.swiper) {
      initListRef.current = structuredClone(data.data.swiper)
      setList(data?.data.swiper)
    }
  }, [data])

  useEffect(() => {
    if (JSON.stringify(initListRef.current) === JSON.stringify(list)) {
      setSatus('default')
    } else {
      setSatus('editing')
    }
  }, [list])

  const uploadSwiperMutation = useMutation({
    mutationFn: uploadSwiperService,
    onSuccess: (result) => {
      if (result.status) {
        toast.success(result.message)
      } else {
        toast.warning(result.message)
      }
    },
    onError: () => {
      toast.error('删除失败！')
    },
    onSettled() {
      setSatus('default')
    },
  })

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    if (!files) return

    const images = Object.values(files).filter((file) =>
      file.type.startsWith('image/')
    )
    const newList = [...list]
    swiperImages.current = images
    const needNums = defaultImageNums - list.length
    if (images.length > needNums) {
      swiperImages.current = images.slice(0, needNums)
    }

    for (let i = 0; i < swiperImages.current.length; i += 1) {
      const base64 = await blobToBase64(swiperImages.current[i])
      newList.push({
        id: `${`${Date.now()}${Math.floor(10000 * Math.random())}`}`,
        src: base64,
        href: '',
      })
    }
    setList(newList)
    event.target.value = ''
  }

  const onSave = () => {
    const formData = new FormData()
    swiperImages.current.forEach((file) => {
      formData.append('file', file as File)
    })
    console.log(swiperImages.current)
    const formdataList = list.map((item) => ({
      ...item,
      src: isBase64(item.src) ? '' : item.src,
    }))
    formData.append('list', JSON.stringify(formdataList))
    setSatus('loading')
    uploadSwiperMutation.mutate({ formData, list: formdataList })
  }

  const onDeleteImage = (id: string) => {
    const index = list.findIndex((item) => item.id === id)
    console.log(index)
    if (index > -1) {
      const newList = [...list]
      newList.splice(index, 1)
      setList(newList)
    }
  }

  const onClickImage = (id: string) => {
    const index = list.findIndex((item) => item.id === id)
    console.log(index)
    if (index > -1) {
      setItemImage(list[index])
    }
  }

  const onSaveImageHref = () => {
    const newlist = [...list]
    const index = newlist.findIndex((item) => item.id === itemImage?.id)
    console.log(index, (newlist[index].href = itemImage?.href), newlist)
    if (index > -1 && itemImage) {
      newlist[index].href = itemImage.href
      setList(newlist)
    }
    setItemImage(null)
  }

  return {
    itemImage,
    list,
    status,
    onSave,
    setList,
    setItemImage,
    onClickImage,
    onFileChange,
    onDeleteImage,
    onSaveImageHref,
  }
}
