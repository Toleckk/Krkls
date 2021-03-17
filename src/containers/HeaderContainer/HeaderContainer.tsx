import React from 'react'
import {Header} from '../../components/Header'
import {useAppSelector} from '../../store'
import {useCopyLink} from '../../hooks/useCopyLink'
import {useSkillsNavigation} from '../../hooks/useSkillsNavigation'
import {selectLvl} from './selectors'

export const HeaderContainer: React.FC = () => {
  const {canRedo, canUndo, redo, undo, reset} = useSkillsNavigation()

  const copy = useCopyLink()

  const {required, current} = useAppSelector(selectLvl)

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
