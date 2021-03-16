import React from 'react'
import {ActionCreators} from 'redux-undo'
import {Header} from '../../components/Header'
import {useAction, useAppSelector} from '../../store'
import {actions as skillsActions} from '../../store/skills'
import {useCopyLink} from '../../hooks/useCopyLink'
import {selectCurrentLvl, selectRequiredLvl} from '../../store/lvls'

export const HeaderContainer: React.FC = () => {
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
    <Header
      onUndo={undo}
      isUndoDisabled={!canUndo}
      onRedo={redo}
      isRedoDisabled={!canRedo}
      onReset={reset}
      onCopy={copy}
      lvl={current}
      requiredLvl={required}
    />
  )
}
