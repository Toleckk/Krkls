import {SkillName} from '../../data/skills.json'

export type Highlight = {
  skills: SkillsHighlight
  items: ItemsHighlight
}

export type SkillsHighlight = Partial<Record<SkillName, number>>

export type ItemsHighlight = Record<string, ItemHighlight>

export type ItemHighlight = {
  name: string
  count: number
}
