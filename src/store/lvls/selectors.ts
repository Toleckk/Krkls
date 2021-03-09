import {createSelector} from '@reduxjs/toolkit'
import {selectHighlightedSkills, selectSkills} from '../skills'
import {Lvls} from './types'
import {composeRequiredLvl, sumCountField} from './helpers'

export const selectLvls = (state: {lvls: Lvls}) => state.lvls

export const selectCurrentLvl = createSelector(selectSkills, selectLvls, (skills, lvls) => {
  const lvl = sumCountField(skills)

  return {
    lvl,
    exp: lvls[lvl],
  }
})

export const selectRequiredLvl = createSelector(
  selectLvls,
  selectSkills,
  (...args: Parameters<typeof selectHighlightedSkills>) => selectHighlightedSkills(...args),
  (lvls, skills, highlight) => {
    const lvl = composeRequiredLvl(skills, highlight)

    return {
      lvl,
      exp: lvls[lvl],
    }
  },
)
