import React from 'react'
import {ActionCreators} from 'redux-undo'
import {Lvl} from './Lvl'
import styles from './Header.module.scss'
import {ControlButton} from '../ui/ControlButton'
import {useCopyLink} from '../services/copy'
import {useAction, useAppSelector} from '../store'
import {actions as skillsActions} from '../store/skills'

export const Header = () => {
  const {canRedo, canUndo} = useAppSelector(store => ({
    canUndo: !!store.skills.past.length,
    canRedo: !!store.skills.future.length,
  }))
  const undo = useAction(ActionCreators.undo)
  const redo = useAction(ActionCreators.redo)

  const reset = useAction(skillsActions.reset)
  const copy = useCopyLink()

  return (
    <header className={styles.header}>
      <Lvl />
      <div className={styles.control}>
        <ControlButton icon="copy" title="Копировать ссылку" onClick={copy} />
        <ControlButton icon="undo" disabled={!canUndo} onClick={undo} title="Назад" />
        <ControlButton onClick={reset} icon="reset" title="Сбросить" />
        <ControlButton icon="redo" disabled={!canRedo} onClick={redo} title="Вперёд" />
      </div>
    </header>
  )
}
