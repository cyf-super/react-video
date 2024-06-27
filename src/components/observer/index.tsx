/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactElement, useEffect, useMemo, useState } from 'react'
import { useIntersection } from 'react-use'

interface ObserverParams {
  children: ReactElement
  reset?: boolean
}

export const IntersectionContext = React.createContext({ inView: true })

export const IntersectionObserver = ({
  children,
  reset = false, // 当reset为 true，observed element将重新渲染
}: ObserverParams) => {
  const [inView, setInView] = useState(false)
  const intersectionRef = React.useRef(null)
  const intersection = useIntersection(intersectionRef, {
    threshold: 0,
  })

  useEffect(() => {
    const inViewNow = intersection && intersection.isIntersecting
    setInView(!!inViewNow)
    if (reset) {
      setInView(false)
    }
  }, [intersection, reset])

  const providerVlaue = useMemo(() => ({ inView }), [inView])

  return (
    <IntersectionContext.Provider value={providerVlaue}>
      <div ref={intersectionRef}>{children}</div>
    </IntersectionContext.Provider>
  )
}
