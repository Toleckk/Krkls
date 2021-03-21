import {Skills} from '@krkls/store/skills'
import {Item} from '@krkls/store/items'

export const sumCountField = (list: Array<{count: number}>): number =>
  list.reduce((sum, {count}) => sum + count, 0)

export const composeRequiredLvl = (skills: Skills, required: Item['skills']): number =>
  skills.reduce((sum, {count, name}) => sum + Math.max(required[name] || 0, count), 0)
