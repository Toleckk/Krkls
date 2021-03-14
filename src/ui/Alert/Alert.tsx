import React, {useEffect, useRef} from 'react'
import c from 'classnames'
import s from './Alert.module.scss'

export type AlertProps = {
  delay?: number
  onHide?: () => unknown
}

export const Alert: React.FC<AlertProps> = React.memo(({children, delay = 3000, onHide}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeout = setTimeout(() => ref.current?.classList.add('disappearing'), delay / 2)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      role="alert"
      ref={ref}
      onClick={onHide}
      onTransitionEnd={onHide}
      className={c(s.alert)}
      style={{transitionDuration: delay / 2 + 'ms'}}
    >
      {children}
    </div>
  )
})
