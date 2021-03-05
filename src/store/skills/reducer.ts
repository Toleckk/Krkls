import {Skill, Skills} from './types'
import {createReducer, PayloadAction} from '@reduxjs/toolkit'
import {SkillName} from '../../data/skills.json'
import {adjustByName} from './helpers'
import {add, decrement, increment, reset} from './actions'

export const createSkillsReducer = (initialState: Skills) =>
  createReducer(initialState, {
    [increment.type]: (skills, action: PayloadAction<{name: SkillName}>) =>
      adjustByName(
        action.payload.name,
        (skill: Skill) => ({
          ...skill,
          count: Math.min(skill.count + 1, skill.limit),
        }),
        skills,
      ),
    [decrement.type]: (skills, action: PayloadAction<{name: SkillName}>) =>
      adjustByName(
        action.payload.name,
        (skill: Skill) => ({
          ...skill,
          count: Math.max(skill.count - 1, 0),
        }),
        skills,
      ),
    [add.type]: (skills, action: PayloadAction<{skills: Skills}>) =>
      skills.map(skill => {
        const minSkill = action.payload.skills.find(minSkill => minSkill.name === skill.name)

        if (minSkill && minSkill.count > skill.count) {
          return {...skill, count: minSkill.count}
        }

        return skill
      }),
    [reset.type]: () => initialState,
  })
