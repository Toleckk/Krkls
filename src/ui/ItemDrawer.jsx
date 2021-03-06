import React, {useEffect} from 'react'
import {Redirect, useLocation} from 'react-router'
import {Drawer} from './Drawer'
import {useDrawer} from '../services/drawer'
import {ItemCard} from './ItemCard'
import styles from './ItemDrawer.module.scss'
import {Icon} from './Icon'
import {actions as highlightActions} from '../store/highlight'
import {useAction} from '../store'

export const ItemDrawer = () => {
  const {item, close, opened} = useDrawer()

  const highlightItem = useAction(highlightActions.highlightItem)
  const resetHighlight = useAction(() => highlightActions.reset())

  const location = useLocation()

  useEffect(() => {
    if (item && opened) {
      highlightItem({item})
      return resetHighlight
    }
  }, [item, highlightItem, resetHighlight, opened])

  if (!item) return <Redirect to={location.pathname} />

  return (
    <Drawer placement="css" visible={opened} onClose={close} delay={150} className={styles.drawer}>
      <ItemCard item={item} />
      <button className={styles.close} onClick={close}>
        <Icon icon="hide" className={styles.icon} />
      </button>
    </Drawer>
  )
}
