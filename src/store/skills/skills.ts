import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {StateWithHistory} from 'redux-undo'
import skills, {Skill, SkillName, Skills} from '../../data/skills.json'
import {adjustByName, urlToCounts} from './helpers'

const urlValue = urlToCounts(window.location.pathname)
export const initialState = skills.map((skill, i) => ({...skill, count: urlValue[i] || 0}))

export const {reducer, actions} = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    increment: (skills, action: PayloadAction<{name: SkillName}>) =>
      adjustByName(
        action.payload.name,
        (skill: Skill) => ({
          ...skill,
          count: Math.min(skill.count + 1, skill.limit),
        }),
        skills,
      ),
    decrement: (skills, action: PayloadAction<{name: SkillName}>) =>
      adjustByName(
        action.payload.name,
        (skill: Skill) => ({
          ...skill,
          count: Math.max(skill.count - 1, 0),
        }),
        skills,
      ),
    add: (skills, action: PayloadAction<{skills: Skill[]}>) =>
      skills.map(skill => {
        const minSkill = action.payload.skills.find(minSkill => minSkill.name === skill.name)

        if (minSkill && minSkill.count > skill.count) {
          return {...skill, count: minSkill.count}
        }

        return skill
      }),
    reset: () => initialState,
  },
})

export const selectSkills = (state: {skills: StateWithHistory<Skill[]>}): Skills =>
  state.skills.present

export const selectSkillByName = (name?: SkillName) => (state: {
  skills: StateWithHistory<Skill[]>
}): Skill | undefined => state.skills.present.find(e => e.name === name)

export const selectSkillsSum = (state: {skills: StateWithHistory<Skill[]>}): number =>
  state.skills.present.reduce((sum, skill) => sum + skill.count, 0)
