import {SkillData} from '../../data/skills.json'

export type Skill = SkillData & {
  count: number
}

export type Skills = Skill[]
