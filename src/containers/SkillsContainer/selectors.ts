import {createSelector} from '@reduxjs/toolkit'
import {selectPresentSkills} from '../../store/skills'
import {selectHighlight} from '../../store/highlight'
import {groupSkills, withHighlight} from './helpers'

export const selectGroupedSkills = createSelector(
  selectPresentSkills,
  selectHighlight,
  (skills, highlight) => {
    const fullSkills = withHighlight(skills, highlight.item)

    return groupSkills(fullSkills)
  },
)
