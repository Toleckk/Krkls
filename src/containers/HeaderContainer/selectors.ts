import {createSelector} from '@reduxjs/toolkit'
import {selectPresentSkills} from '../../store/skills'
import {composeRequiredLvl, sumCountField} from './helpers'
import {selectLvls} from '../../store/lvls'
import {selectHighlight} from '../../store/highlight'

export const selectLvl = createSelector(
  selectPresentSkills,
  selectLvls,
  selectHighlight,
  (skills, lvls, highlight) => {
    const currentLvl = sumCountField(skills)
    const current = {
      lvl: currentLvl,
      exp: lvls[currentLvl],
    }

    if (!highlight.item) {
      return {current, required: current}
    }

    const requiredLvl = composeRequiredLvl(skills, highlight.item.skills)
    return {current, required: {lvl: requiredLvl, exp: lvls[requiredLvl]}}
  },
)
