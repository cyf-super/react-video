/* eslint-disable import/no-extraneous-dependencies */
import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useIntersection } from 'react-use'

interface ObserverParams {
  children: ReactElement
  firstRender?: boolean
}

export const IntersectionContext = React.createContext({ inView: true })

/**
 * 元素是否进入屏幕
 * @param param0
 * @returns
 */
export const IntersectionObserver = ({
  children,
  firstRender = true, // 是否记录首次渲染即可
}: ObserverParams) => {
  const [inView, setInView] = useState(false)
  const intersectionRef = React.useRef(null)
  const intersection = useIntersection(intersectionRef, {
    threshold: 0,
  })
  const hasRenderRef = useRef(false)

  useEffect(() => {
    const inViewNow = intersection && intersection.isIntersecting
    if (firstRender) {
      setInView(hasRenderRef.current || !!inViewNow)
      !!inViewNow && (hasRenderRef.current = true)
      console.log('!!inViewNow--> ', !!inViewNow, firstRender)
    } else {
      setInView(!!inViewNow)
    }
  }, [intersection, firstRender])

  console.log(inView)

  const providerVlaue = useMemo(() => ({ inView }), [inView])

  return (
    <IntersectionContext.Provider value={providerVlaue}>
      <div ref={intersectionRef}>{children}</div>
    </IntersectionContext.Provider>
  )
}
