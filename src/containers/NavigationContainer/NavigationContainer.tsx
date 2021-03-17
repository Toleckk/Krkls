import React from 'react'
import {Navigation} from '../../components/Navigation'
import {useSkillsNavigation} from '../../hooks/useSkillsNavigation'
import {useCopyLink} from '../../hooks/useCopyLink'

export const NavigationContainer: React.FC = () => {
  const {canRedo, canUndo, redo, undo, reset} = useSkillsNavigation()
  const copy = useCopyLink()

  return (
    <Navigation
      onUndo={undo}
      isUndoDisabled={!canUndo}
      isRedoDisabled={!canRedo}
      onReset={reset}
      onRedo={redo}
      onCopy={copy}
    />
  )
}
