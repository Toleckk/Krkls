import type {StateWithHistory} from 'redux-undo'
import {createSelector} from '@reduxjs/toolkit'
import {Item, Items} from '@krkls/store/items'
import {Skills} from '@krkls/store/skills'

export const selectItemByName = (name: string | undefined) =>
  createSelector(
    (store: {items: Items}) => store.items,
    (store: {skills: StateWithHistory<Skills>}) => store.skills.present,
    (
      items,
      skills,
    ): undefined | (Item & {skillMap: Array<{name: string; required: number; count: number}>}) => {
      if (!name) {
        return undefined
      }

      const item = items.find(item => item.name === name)

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
    },
  )
