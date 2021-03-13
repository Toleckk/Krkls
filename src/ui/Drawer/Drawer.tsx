import React, {
  HTMLAttributes,
  TransitionEventHandler,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import c from 'classnames'
import s from './Drawer.module.scss'

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom'

export type DrawerProps = {
  show: boolean
  onHide?: () => unknown
  placement?: DrawerPlacement
  zIndex?: number
  duration?: number
} & HTMLAttributes<HTMLDivElement>

export const Drawer: React.FC<DrawerProps> = ({
  show,
  placement = 'left',
  zIndex,
  children,
  onHide,
  duration = 300,
  onTransitionEnd,
  className,
  style,
  ...props
}) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (show) {
      const {current} = ref
      current?.classList.add('opening')
      setTimeout(() => current?.classList.remove('opening'), 0)
    } else {
      const {current} = ref
      current?.classList.add('closing')

      return () => current?.classList.remove('closing')
    }
  }, [show])

  const [closed, setClosed] = useState(true)

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
      setClosed(false)
      return () => setClosed(false)
    }
  }, [show])

  const handleTransitionEnd = useCallback<TransitionEventHandler<HTMLDivElement>>(
    e => {
      if (!show) {
        document.body.style.overflow = 'initial'
        setClosed(true)
      }
      return onTransitionEnd?.(e)
    },
    [show, onTransitionEnd],
  )

  const lastOpenedChildrenRef = useRef(children)

  if (show) {
    lastOpenedChildrenRef.current = children
  }

  if (closed && !show) {
    return null
  }

  return (
    <div
      role="dialog"
      aria-label="drawer"
      style={{zIndex, transitionDuration: `${duration}ms`, ...style}}
      className={c(s.drawer, className)}
      onTransitionEnd={handleTransitionEnd}
      ref={ref}
      {...props}
    >
      <div role="presentation" aria-label="mask" onClick={onHide} className={s.mask} />
      <div className={c(s.content, placement)}>{lastOpenedChildrenRef.current}</div>
    </div>
  )
}
