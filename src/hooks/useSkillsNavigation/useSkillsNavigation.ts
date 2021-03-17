import {ActionCreators} from 'redux-undo'
import {useAction, useAppSelector} from '../../store'
import {actions as skillsActions} from '../../store/skills'
import {selectSkillsHistoryState} from './selectors'

export type UseSkillsNavigationResult = {
  undo: () => void
  canUndo: boolean
  redo: () => void
  canRedo: boolean
  reset: () => void
}

export const useSkillsNavigation = (): UseSkillsNavigationResult => {
  const {canUndo, canRedo} = useAppSelector(selectSkillsHistoryState)
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
