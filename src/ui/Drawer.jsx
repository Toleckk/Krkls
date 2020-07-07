import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import c from 'classnames'
import styles from './Drawer.module.scss'
import {createPortal} from 'react-dom'


export const Drawer = ({placement, className, visible, onClose, children, delay = 300, z = 10}) => {
    const [opened, setOpened] = useState(0)
    const bodyOverflow = useRef('')

    const close = useCallback(() => {
        if(opened) {
            setOpened(0)
            setTimeout(onClose, Math.min(Date.now() - opened, delay))
        }
    }, [setOpened, onClose, delay, opened])

    useEffect(() => {
        if(visible) {
            bodyOverflow.current = document.body.style.overflow
            document.body.style.overflow = 'hidden'
            setOpened(Date.now())
        } else
            document.body.style.overflow = bodyOverflow.current
    }, [visible, setOpened])

    const transition = useMemo(() => ({transitionDuration: delay + 'ms'}), [delay])

    if (!visible && !opened)
        return <></>

    return createPortal(
        <div className={c(styles.container, styles[placement])} style={{zIndex: z}}>
            <div
                onClick={close}
                className={c(styles.mask, opened && styles.opened)}
                style={transition}
            />
            <div
                className={c(className, styles.content, styles[placement], opened && styles.opened)}
                style={{...transition, zIndex: z}}
            >{children}</div>
        </div>,
        document.body,
    )
}