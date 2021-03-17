import {createSelector} from '@reduxjs/toolkit'
import {selectHighlight, selectPresentSkills} from '../../store'
import {groupSkills, withHighlight} from './helpers'

export const selectGroupedSkills = createSelector(
  selectPresentSkills,
  selectHighlight,
  (skills, highlight) => {
    const fullSkills = withHighlight(skills, highlight.item)

    return groupSkills(fullSkills)
  },
)
