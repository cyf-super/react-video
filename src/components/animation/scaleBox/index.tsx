import React, { useMemo, useContext, ReactElement } from 'react'

import { motion } from 'framer-motion'
import { IntersectionContext } from '@/components/observer'

interface ScaleBoxParams {
  children: ReactElement | ReactElement[] | null
  duration?: number
  easing?: number[]
  delayOrder?: number
  [key: string]: any
}

export const ScaleBox = ({
  children,
  delayOrder = 1, // order of appearance
  duration = 0.4,
  easing = [0.42, 0, 0.58, 1], // [number, number, number, number] | "linear" | "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" | "backInOut" | "anticipate" | EasingFunction;
  ...rest
}: ScaleBoxParams) => {
  const { inView } = useContext(IntersectionContext)
  console.log('ScaleBox ', inView)

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
      scale: 0,
      opacity: 0,
      transition,
    },
    show: {
      scale: 1,
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
