import type {StateWithHistory} from 'redux-undo'
import {createSelector} from '@reduxjs/toolkit'
import {Item, Items} from '@krkls/store/items'
import {Skills} from '@krkls/store/skills'
import {selectItems, selectPresentSkills} from '@krkls/store'
import {findByProp} from '@krkls/utils'

export const selectItemByName = (
  name: string | undefined,
): ((store: {
  items: Items
  skills: StateWithHistory<Skills>
}) => undefined | (Item & {skillMap: Array<{name: string; required: number; count: number}>})) =>
  createSelector(selectItems, selectPresentSkills, (items, skills) => {
    if (!name) {
      return undefined
    }

    const item = findByProp('name', name, items)

    if (!item) {
      return undefined
    }

    return {
      ...item,
      skillMap: skills
        .filter(skill => skill.name in item.skills)
        .map(skill => ({
          ...skill,
          required: item.skills[skill.name],
        })),
    }
  })
