import React from 'react'
import {mapSelections} from './helpers'
import s from './Effects.module.scss'

export type EffectsProps = {
  effects: string[]
}

export const Effects: React.FC<EffectsProps> = ({effects}) => (
  <ul className={s.list}>
    {effects.map((effect, i) => (
      <li key={i} className={s.item}>
        {mapSelections(effect, (e, i) => (
          <span key={i} className={s.select}>
            {e}
          </span>
        ))}
      </li>
    ))}
  </ul>
)
