import {useAction, useAppSelector} from '../../store'
import {ActionCreators} from 'redux-undo'
import {actions as skillsActions} from '../../store/skills'

export type UseSkillsNavigationResult = {
  undo: () => void
  canUndo: boolean
  redo: () => void
  canRedo: boolean
  reset: () => void
}

export const useSkillsNavigation = (): UseSkillsNavigationResult => {
  const {canUndo, canRedo} = useAppSelector(store => ({
    canUndo: !!store.skills.past.length,
    canRedo: !!store.skills.future.length,
  }))
  const undo = useAction(ActionCreators.undo)
  const redo = useAction(ActionCreators.redo)

  const reset = useAction(skillsActions.reset)

  return {
    undo,
    canUndo,
    redo,
    canRedo,
    reset,
  }
}
