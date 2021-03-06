import {createSelector} from '@reduxjs/toolkit'
import initialLvls from '../../data/lvls.json'
import {selectSkills, selectHighlightedSkills} from '../skills'

export const selectExp = (lvl: number) => (state: {lvls: typeof initialLvls}) => state.lvls[lvl]

export const selectRequiredLvl = createSelector(
  selectSkills,
  (...args: Parameters<typeof selectHighlightedSkills>) => selectHighlightedSkills(...args),
  (skills, highlightedSkills) =>
    skills
      .filter(skill => highlightedSkills[skill.name])
      .map(({count, name}) => {
        const {[name]: requiredCount = 0} = highlightedSkills

        return requiredCount > count ? requiredCount - count : 0
      })
      .reduce((acc, cur) => acc + cur, 0) || 1,
)
