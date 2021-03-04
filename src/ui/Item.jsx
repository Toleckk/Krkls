import React, {useCallback} from 'react'
import classNames from 'classnames'
import styles from './Item.module.scss'
import {useSkillsContext} from '../services/skills'
import {useHighlightContext} from '../services/highlight'
import {Button} from './Button'
import {useDrawer} from '../services/drawer'

export const Item = ({item}) => {
  const {setItem, open} = useDrawer()

  const {findSkill} = useSkillsContext()

  const {highlightSkills, resetSkillsHighlight, highlightedItems} = useHighlightContext()

  const {available, name} = item
  const required = highlightedItems[name]

  const openDrawer = useCallback(() => {
    setItem(item)
    open()
  }, [setItem, item, open])

  return (
    <Button
      available={available}
      className={classNames(styles.item, {[styles.highlighted]: required})}
      title={name}
      onClick={openDrawer}
      onMouseEnter={() => highlightSkills(item)}
      onMouseLeave={resetSkillsHighlight}
    >
      <img className={styles.image} src={item.image} alt={item.name} />
      <div
        className={classNames(styles.highlight, {
          [styles.visible]: required,
          [styles.available]: required && required.count <= findSkill(required.name).count,
        })}
      >
        {required && required.count}
      </div>
    </Button>
  )
}
