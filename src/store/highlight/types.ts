import {Item} from '../items'

export type SkillHighlight = string

export type ItemHighlight = Pick<Item, 'skills' | 'name'>

export type SkillsHighlight = {
  skill: SkillHighlight
  item?: undefined
}

export type ItemsHighlight = {
  item: ItemHighlight
  skill?: undefined
}

export type Highlight = SkillsHighlight | ItemsHighlight | {item?: undefined; skill?: undefined}
