import React, {memo} from 'react'
import {List} from '../ui/List'
import styles from './Ships.module.css'
import {useAppSelector} from '../store'
import {selectSortedShips} from '../store/items'

const key = ship => ship.race + ' ' + ship.name

export const Ships = memo(() => {
  const sortedShips = useAppSelector(selectSortedShips)

  return (
    <div className={styles.ships}>
      {sortedShips.map(c => (
        <div className={styles.ships} key={c[0].name}>
          <List items={c} makeKey={key} />
        </div>
      ))}
    </div>
  )
})
