import React from 'react'
import {Navigation} from '@krkls/components/Navigation'
import {useSkillsNavigation} from '@krkls/hooks/useSkillsNavigation'
import {useCopyLink} from '@krkls/hooks/useCopyLink'

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
