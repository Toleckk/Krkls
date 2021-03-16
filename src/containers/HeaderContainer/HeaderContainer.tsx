import React from 'react'
import {Header} from '../../components/Header'
import {useAppSelector} from '../../store'
import {useCopyLink} from '../../hooks/useCopyLink'
import {selectCurrentLvl, selectRequiredLvl} from '../../store/lvls'
import {useSkillsNavigation} from '../../hooks/useSkillsNavigation'

export const HeaderContainer: React.FC = () => {
  const {canRedo, canUndo, redo, undo, reset} = useSkillsNavigation()

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
