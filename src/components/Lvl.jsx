import React from 'react'
import classNames from 'classnames'
import {short} from '../utils'
import styles from './Lvl.module.scss'
import {useAppSelector} from '../store'
import {selectSkillsSum} from '../store/skills'
import {selectExp, selectRequiredLvl} from '../store/lvls'

export const Lvl = () => {
  const sum = useAppSelector(selectSkillsSum)
  const requiredLvl = useAppSelector(selectRequiredLvl)
  const exp = useAppSelector(selectExp(sum))
  const requiredExp = useAppSelector(selectExp(requiredLvl + sum))

  return (
    <div className={styles.column}>
      <div className={styles.row}>
        <div>
          <span className={styles.lvl}>{sum}</span>
          <span className={styles.exp}>{short(exp)}</span>
        </div>
        <div>
          <span className={styles.exp}>{short(requiredExp)}</span>
          <span className={classNames(styles.lvl, styles.required)}>{requiredLvl + sum}</span>
        </div>
      </div>
      <div className={styles.progress}>
        <div className={styles.has} style={{minWidth: (exp / requiredExp) * 100 + '%'}} />
      </div>
    </div>
  )
}
