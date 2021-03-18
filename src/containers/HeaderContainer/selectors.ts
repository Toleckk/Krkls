import {createSelector} from '@reduxjs/toolkit'
import {selectHighlight, selectItems, selectLvls, selectPresentSkills} from '@krkls/store'
import {findByProp} from '@krkls/utils'
import {composeRequiredLvl, sumCountField} from './helpers'

export const selectLvl = createSelector(
  selectPresentSkills,
  selectLvls,
  selectHighlight,
  selectItems,
  (skills, lvls, highlight, items) => {
    const currentLvl = sumCountField(skills)
    const current = {
      lvl: currentLvl,
      exp: lvls[currentLvl],
    }

    if (!highlight.item) {
      return {current, required: current}
    }

    const item = findByProp('name', highlight.item, items)

    if (!item) {
      return {current, required: current}
    }

    const requiredLvl = composeRequiredLvl(skills, item.skills)
    return {current, required: {lvl: requiredLvl, exp: lvls[requiredLvl]}}
  },
)
