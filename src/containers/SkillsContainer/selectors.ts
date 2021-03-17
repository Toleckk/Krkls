import {createSelector} from '@reduxjs/toolkit'
import {selectHighlight, selectItems, selectPresentSkills} from '../../store'
import {findByProp} from '../../utils'
import {groupSkills, withHighlight} from './helpers'

export const selectGroupedSkills = createSelector(
  selectPresentSkills,
  selectHighlight,
  selectItems,
  (skills, highlight, items) => {
    const item = findByProp('name', highlight.item, items)

    const fullSkills = withHighlight(skills, item?.skills)

    return groupSkills(fullSkills)
  },
)
