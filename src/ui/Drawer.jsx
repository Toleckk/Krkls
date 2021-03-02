import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import c from 'classnames'
import styles from './Drawer.module.scss'
import {createPortal} from 'react-dom'

export const Drawer = ({placement, className, visible, onClose, children, delay = 300, z = 10}) => {
  const [opened, setOpened] = useState(0)
  const bodyOverflow = useRef('')

  useEffect(() => {
    if (!visible && opened) {
      const timeout = setTimeout(() => setOpened(0), Math.min(Date.now() - opened, delay))
      document.body.style.overflow = bodyOverflow.current
      return () => clearTimeout(timeout)
    }
  })

  useLayoutEffect(() => {
    if (visible && !opened) {
      setOpened(Date.now())
      bodyOverflow.current = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
  }, [visible, setOpened, opened, delay])

  const transition = useMemo(() => ({transitionDuration: delay + 'ms'}), [delay])

  return createPortal(
    <div
      className={c(styles.container, styles[placement], (opened || visible) && styles.opened)}
      style={{zIndex: z}}
    >
      <div
        onClick={onClose}
        className={c(styles.mask, visible && styles.opened)}
        style={transition}
      />
      <div
        className={c(className, styles.content, styles[placement], visible && styles.opened)}
        style={{...transition, zIndex: z}}
      >
        {opened || visible ? children : null}
      </div>
    </div>,
    document.body,
  )
}
