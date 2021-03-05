import {StateWithHistory} from 'redux-undo'
import {Skill, Skills} from './types'
import {SkillName} from '../../data/skills.json'

export const selectSkills = (state: {skills: StateWithHistory<Skills>}): Skills =>
  state.skills.present

export const selectSkillByName = (name?: SkillName) => (state: {
  skills: StateWithHistory<Skills>
}): Skill | undefined => state.skills.present.find(e => e.name === name)

export const selectSkillsSum = (state: {skills: StateWithHistory<Skills>}): number =>
  state.skills.present.reduce((sum, skill) => sum + skill.count, 0)
