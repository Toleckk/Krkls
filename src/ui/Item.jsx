import React, {useCallback} from 'react'
import classNames from 'classnames'
import styles from './Item.module.scss'
import {Button} from './Button'
import {useDrawer} from '../services/drawer'
import {useAction, useAppSelector} from '../store'
import {selectSkillByName} from '../store/skills'
import {selectHighlightedItems} from '../store/items'
import {actions as highlightActions} from '../store/highlight'

export const Item = ({item}) => {
  const {setItem, open, opened} = useDrawer()
  const highlightedItems = useAppSelector(selectHighlightedItems)
  const highlightItem = useAction(() => highlightActions.highlightItem({item}))
  const resetHighlight = useAction(() => highlightActions.reset())

  const {available, name} = item
  const required = highlightedItems[name]

  const requiredSkill = useAppSelector(selectSkillByName(required?.name))

  const openDrawer = useCallback(() => {
    setItem(item)
    open()
  }, [setItem, item, open])

  const onMouseLeave = () => {
    if (!opened) {
      resetHighlight()
    }
  }

  return (
    <Button
      available={available}
      className={classNames(styles.item, {[styles.highlighted]: required})}
      title={name}
      onClick={openDrawer}
      onMouseEnter={highlightItem}
      onMouseLeave={onMouseLeave}
    >
      <img className={styles.image} src={item.image} alt={item.name} />
      <div
        className={classNames(styles.highlight, {
          [styles.visible]: required,
          [styles.available]: required && required.count <= requiredSkill.count,
        })}
      >
        {required && required.count}
      </div>
    </Button>
  )
}
