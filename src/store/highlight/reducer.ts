import {createReducer, PayloadAction} from '@reduxjs/toolkit'
import {Highlight, ItemsHighlight, SkillsHighlight} from './types'
import {Item} from '../items'
import {Skill} from '../skills'
import {
  highlightItems,
  highlightItemsForSkill,
  highlightSkills,
  resetItems,
  resetSkills,
} from './actions'

export const createHighlightReducer = (initialState: Highlight) =>
  createReducer(initialState, {
    [highlightSkills.type]: (state, action: PayloadAction<{skills: SkillsHighlight}>) => ({
      ...state,
      skills: action.payload.skills,
    }),
    [highlightItems.type]: (state, action: PayloadAction<{items: ItemsHighlight}>) => ({
      ...state,
      items: action.payload.items,
    }),
    [highlightItemsForSkill.type]: (
      state,
      action: PayloadAction<{items: Item[]; skill: Skill}>,
    ) => ({
      ...state,
      items: action.payload.items.reduce<ItemsHighlight>((acc, item) => {
        const count = item.skills[action.payload.skill.name]
        return count ? {...acc, [item.name]: {name: action.payload.skill.name, count}} : acc
      }, {}),
    }),
    [resetItems.type]: state => ({...state, items: initialState.items}),
    [resetSkills.type]: state => ({...state, skills: initialState.skills}),
  })
