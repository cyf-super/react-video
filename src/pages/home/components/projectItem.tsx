import { motion } from 'framer-motion'
import { openNewTag } from '@cyf-super/utils'
import { FormatFileDataType } from '@/utils/type'

export const Card = ({ file }: { file: FormatFileDataType }) => {
  const {
    fileId,
    name,
    categoryId,
    path,
    create: timer,
    type,
    videoImgPath,
  } = file
  const onView = () => {
    const url = `${window.location.origin}/view/${fileId}`
    openNewTag(url)
  }

  const renderTag = () => {
    if (type.startsWith('image')) {
      return (
        <img
          src={path}
          alt=""
          className="rounded-t-xl border-none"
          onClick={onView}
        />
      )
    }
    if (type.startsWith('video')) {
      return (
        <div className="`bg-cover bg-no-repeat bg-video)]`">
          <img
            src={videoImgPath}
            alt=""
            className="rounded-t-xl border-none"
            onClick={onView}
          />
        </div>
      )
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
            className="font-general-medium text-base md:text-xl overflow-hidden whitespace-nowrap overflow-ellipsis"
            title={name}
          >
            {name}
          </p>
          <div className="mt-2">
            <span>{categoryId}</span>
            <span className="ml-3">{timer}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
