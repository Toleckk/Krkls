import React from 'react'
import {ActionCreators} from 'redux-undo'
import {Lvl} from '../Lvl'
import {ControlButton} from '../../ui/ControlButton'
import {useCopyLink} from '../../hooks/useCopyLink'
import {useAction, useAppSelector} from '../../store'
import {actions as skillsActions} from '../../store/skills'
import {selectCurrentLvl, selectRequiredLvl} from '../../store/lvls'
import s from './Header.module.scss'

export const Header = () => {
  const {canRedo, canUndo} = useAppSelector(store => ({
    canUndo: !!store.skills.past.length,
    canRedo: !!store.skills.future.length,
  }))
  const undo = useAction(ActionCreators.undo)
  const redo = useAction(ActionCreators.redo)

  const reset = useAction(skillsActions.reset)
  const copy = useCopyLink()

  const current = useAppSelector(selectCurrentLvl)
  const required = useAppSelector(selectRequiredLvl)

  return (
    <header className={s.header}>
      <Lvl
        currentExp={current.exp}
        currentLvl={current.lvl}
        requiredExp={required.exp}
        requiredLvl={required.lvl}
      />
      <div className={s.control}>
        <ControlButton icon="copy" title="Копировать ссылку" onClick={copy} />
        <ControlButton icon="undo" disabled={!canUndo} onClick={undo} title="Назад" />
        <ControlButton onClick={reset} icon="reset" title="Сбросить" />
        <ControlButton icon="redo" disabled={!canRedo} onClick={redo} title="Вперёд" />
      </div>
    </header>
  )
}
