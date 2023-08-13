import { motion } from 'framer-motion'

interface CardType {
  title: string
  category: string
  src: string
  timer: string
}

export const Card = ({ title, category, src, timer }: CardType) => (
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
      <img src={src} alt="" className="rounded-t-xl border-none" />
      <div className="text-center py-5 mx-5">
        <p
          className="font-general-medium text-base md:text-xl overflow-hidden whitespace-nowrap overflow-ellipsis"
          title={title}
        >
          {title}
        </p>
        <div className="mt-2">
          <span>{category}</span>
          <span className="ml-3">{timer}</span>
        </div>
      </div>
    </div>
  </motion.div>
)
