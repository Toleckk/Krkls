import {SkillName} from '../../data/skills.json'
import {Item} from '../items'

export type SkillHighlight = SkillName

export type ItemHighlight = Pick<Item, 'skills'>

export type SkillsHighlight = {
  skill: SkillHighlight
}

export type ItemsHighlight = {
  item: ItemHighlight
}

export type Highlight = SkillsHighlight | ItemsHighlight | Record<never, never>
