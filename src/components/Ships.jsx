import React, {memo, useMemo} from 'react'
import {List} from '../ui/List'
import styles from './Ships.module.css'
import {useItems, sortShips} from '../services/items'

const key = ship => ship.race + ' ' + ship.name

export const Ships = memo(() => {
  const {ships} = useItems()

  const sortedShips = useMemo(() => sortShips(ships), [ships])

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
