import { useContext, useMemo, useState, useEffect, ReactElement } from 'react'
import { motion } from 'framer-motion'
import { IntersectionContext } from '@/components/observer'

type FadeInUpBoxparams = {
  children: ReactElement
  yOffset?: number
  easing?: number[]
  delayOrder?: number
  [key: string]: any
}

export const FadeInUpBox = ({
  children,
  yOffset = 24, // y initial possition
  easing = [0.42, 0, 0.58, 1], // [number, number, number, number] | "linear" | "easeIn" |
  //  "easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" |
  // "backInOut" | "anticipate" | EasingFunction;
  delayOrder, // order of appearance
  ...rest
}: FadeInUpBoxparams) => {
  const { inView } = useContext(IntersectionContext)
  const [delay, setDelay] = useState(0.25)

  const offset = 0.4

  useEffect(() => {
    if (delayOrder) setDelay(delayOrder * offset)
  }, [delayOrder, offset])

  const transition = useMemo(
    () => ({
      duration: 0.4,
      delay,
      ease: easing,
    }),
    [delay, easing]
  )

  const variants = {
    hidden: { y: yOffset, opacity: 0, transition },
    show: {
      y: 0,
      x: 0,
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
