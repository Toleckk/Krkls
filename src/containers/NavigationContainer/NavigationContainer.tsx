import React from 'react'
import {Navigation} from '@krkls/components'
import {useCopyLink, useSkillsNavigation} from '@krkls/hooks'

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
