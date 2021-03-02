import React, {useEffect, useMemo, useState} from 'react'
import styles from './Alert.module.scss'
import {useAlert} from '../services/alert'

export const Alert = () => {
  const {tip, close} = useAlert()
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    if (tip) {
      setOpacity(1)
      const timeout = setTimeout(() => setOpacity(0), tip.delay / 2)
      return () => {
        setOpacity(1)
        clearTimeout(timeout)
      }
    }
    setOpacity(1)
  }, [tip, setOpacity])

  const style = useMemo(() => ({opacity, transitionDuration: tip && tip.delay / 2 + 'ms'}), [
    opacity,
    tip,
  ])

  if (!tip) return <></>

  const {Component, text} = tip

  return (
    <div className={styles.alert} onClick={close}>
      {Component ? (
        <Component>{text}</Component>
      ) : (
        <div className={styles.text} style={style}>
          {text}
        </div>
      )}
    </div>
  )
}
