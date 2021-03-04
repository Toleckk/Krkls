import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Skill} from '../skills'
import {Item} from '../items/types'
import {Highlight, ItemsHighlight, SkillsHighlight} from './types'

export const initialState: Highlight = {
  skills: {},
  items: {},
}

export const {actions, reducer} = createSlice({
  name: 'highlight',
  initialState,
  reducers: {
    highlightSkills: (state, action: PayloadAction<{skills: SkillsHighlight}>) => ({
      ...state,
      skills: action.payload.skills,
    }),
    highlightItems: (state, action: PayloadAction<{items: ItemsHighlight}>) => ({
      ...state,
      items: action.payload.items,
    }),
    highlightItemsForSkill: (state, action: PayloadAction<{items: Item[]; skill: Skill}>) => ({
      ...state,
      items: action.payload.items.reduce<ItemsHighlight>((acc, item) => {
        const count = item.skills[action.payload.skill.name]
        return count ? {...acc, [item.name]: {name: action.payload.skill.name, count}} : acc
      }, {}),
    }),
    resetItems: state => ({...state, items: initialState.items}),
    resetSkills: state => ({...state, skills: initialState.skills}),
  },
})

export const selectHighlightedItems = (state: {highlight: typeof initialState}) =>
  state.highlight.items

export const selectHighlightedSkills = (state: {highlight: typeof initialState}) =>
  state.highlight.skills
