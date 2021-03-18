import type {SkillData} from '@krkls/data/skills.json'

export type Skill = SkillData & {
  count: number
}

export type Skills = Skill[]
