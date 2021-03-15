import React from 'react'
import c from 'classnames'
import {short} from '../../utils'
import {Line} from '../../ui/Line'
import s from './Lvl.module.scss'

export type LvlDescription = {
  lvl: number
  exp: number
}

export type LvlProps = {
  currentLvl: number
  currentExp: number
  requiredLvl: number
  requiredExp: number
}

export const Lvl: React.FC<LvlProps> = ({requiredLvl, requiredExp, currentLvl, currentExp}) => (
  <div className={s.column}>
    <div className={s.row}>
      <div>
        <span className={s.lvl}>{currentLvl}</span>
        <span className={s.exp}>{short(currentExp)}</span>
      </div>
      <div>
        <span className={s.exp}>{short(requiredExp)}</span>
        <span className={c(s.lvl, s.required)}>{requiredLvl}</span>
      </div>
    </div>
    <Line value={currentExp / requiredExp} />
  </div>
)