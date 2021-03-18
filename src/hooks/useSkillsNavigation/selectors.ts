import {createSelector} from '@reduxjs/toolkit'
import {selectSkills} from '@krkls/store'

export const selectSkillsHistoryState = createSelector(selectSkills, skills => ({
  canUndo: !!skills.past.length,
  canRedo: !!skills.future.length,
}))
