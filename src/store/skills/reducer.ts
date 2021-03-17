import {createReducer, PayloadAction} from '@reduxjs/toolkit'
import {Skill, Skills} from './types'
import {addSkillsCounts, adjustByName} from './helpers'
import {add, decrement, increment, reset} from './actions'

export const createSkillsReducer = (initialState: Skills) =>
  createReducer(initialState, {
    [increment.type]: (skills, action: PayloadAction<{name: string}>) =>
      adjustByName(
        action.payload.name,
        (skill: Skill) => ({
          ...skill,
          count: Math.min(skill.count + 1, skill.limit),
        }),
        skills,
      ),
    [decrement.type]: (skills, action: PayloadAction<{name: string}>) =>
      adjustByName(
        action.payload.name,
        skill => ({
          ...skill,
          count: Math.max(skill.count - 1, 0),
        }),
        skills,
      ),
    [add.type]: (skills, action: PayloadAction<{skills: Array<{name: string; count: number}>}>) =>
      addSkillsCounts(skills, action.payload.skills),
    [reset.type]: () => initialState,
  })
