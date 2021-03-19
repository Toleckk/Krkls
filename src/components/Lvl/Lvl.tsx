import React from 'react'
import c from 'classnames'
import {short} from '@krkls/utils'
import {Line} from '@krkls/ui'
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
        <span title="Текущий уровень" className={s.lvl}>
          {currentLvl}
        </span>
        <span title="Текущий опыт" className={s.exp}>
          {short(currentExp)}
        </span>
      </div>
      <div aria-hidden={currentLvl === requiredLvl}>
        <span title="Необходимый опыт" className={s.exp}>
          {short(requiredExp)}
        </span>
        <span title="Необходимый уровень" className={c(s.lvl, s.required)}>
          {requiredLvl}
        </span>
      </div>
    </div>
    <Line value={currentExp / requiredExp} />
  </div>
)
