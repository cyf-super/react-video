import { ReactElement, useContext, useMemo } from 'react'
import { motion } from 'framer-motion'
import { IntersectionContext } from '@/components/observer'

type SlideInBoxParams = {
  children: ReactElement | ReactElement[] | null
  duration?: number
  direction?: 'left' | 'right'
  xOffset?: number
  easing?: number[] | string
  delayOrder?: number
  [key: string]: any
}

export const SlideInUpBox = ({
  children,
  xOffset = 200,
  delayOrder = 1, // order of appearance
  duration = 0.4,
  easing = [0.42, 0, 0.58, 1], // [number, number, number, number] | "linear" | "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" | "backInOut" | "anticipate" | EasingFunction;
  ...rest
}: SlideInBoxParams) => {
  const { inView } = useContext(IntersectionContext)

  const transition = useMemo(
    () => ({
      duration,
      delay: delayOrder / 5,
      ease: easing,
    }),
    [duration, delayOrder, easing]
  )

  const variants = {
    hidden: {
      x: xOffset,
      opacity: 0,
      transition,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition,
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      exit="hidden"
      variants={variants}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
