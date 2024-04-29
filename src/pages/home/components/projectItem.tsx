import { motion } from 'framer-motion'
import { openNewTag } from '@cyf-super/utils'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { FormatFileDataType } from '@/utils/type'
import { sliceNameType } from '@/utils/files'
import { selectCateGory } from '@/store/slices/fileslice'

type CateGoryMapType = { [key: string]: string }

export const Card = ({ file }: { file: FormatFileDataType }) => {
  const { fileId, name, categoryId, path, createdAt, type, videoImgPath } = file
  const onView = () => {
    const url = `${window.location.origin}/view/${fileId}`
    openNewTag(url)
  }

  const cateGories = useSelector(selectCateGory)
  const cateGoryMap = cateGories.reduce((pre, item) => {
    pre[item.id] = item.label
    return pre
  }, {} as CateGoryMapType)

  const renderTag = () => {
    switch (true) {
      case type.startsWith('image'):
        return (
          <img
            src={path}
            alt=""
            className="aspect-video rounded-t-xl border-none object-fill"
            onClick={onView}
          />
        )
      case type.startsWith('video'):
        return (
          <div className="`bg-cover bg-no-repeat bg-video`">
            <img
              src={videoImgPath}
              alt=""
              className="aspect-video  rounded-t-xl border-none object-cover"
              onClick={onView}
            />
          </div>
        )
      default:
        break
    }

    return (
      <img
        src="/image/1691418748881.summer.jpg"
        alt=""
        className="rounded-t-xl border-none"
        onClick={onView}
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: 'easeInOut',
        duration: 0.7,
        delay: 0.15,
      }}
    >
      <div className="rounded-xl shadow-lg hover:shadow-xl cursor-pointer mb-10 sm:mb-0 bg-secondary-light">
        <div className="text-center py-5 mx-5">
          {renderTag()}
          <p
            className="mt-2 font-general-medium text-base md:text-xl truncate"
            title={name}
          >
            {sliceNameType(name)[0]}
          </p>
          <div className="mt-2 text-xs text-slate-400">
            <div>
              类别：
              <span className="">{cateGoryMap[categoryId]}</span>
            </div>
            <div>
              <span className="ml-3">
                时间：
                {dayjs(createdAt).format('YYYY-MM-DD HH:mm')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
