import React from 'react'
import classNames from 'classnames'
import {short} from '../utils'
import styles from './Lvl.module.scss'
import {useAppSelector} from '../store'
import {selectCurrentLvl, selectRequiredLvl} from '../store/lvls'

export const Lvl = () => {
  const current = useAppSelector(selectCurrentLvl)
  const required = useAppSelector(selectRequiredLvl)

  return (
    <div className={styles.column}>
      <div className={styles.row}>
        <div>
          <span className={styles.lvl}>{current.lvl}</span>
          <span className={styles.exp}>{short(current.exp)}</span>
        </div>
        <div>
          <span className={styles.exp}>{short(required.exp)}</span>
          <span className={classNames(styles.lvl, styles.required)}>{required.lvl}</span>
        </div>
      </div>
      <div className={styles.progress}>
        <div className={styles.has} style={{minWidth: (current.exp / required.exp) * 100 + '%'}} />
      </div>
    </div>
  )
}
