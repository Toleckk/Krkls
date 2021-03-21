import {Skills} from '../../store/skills'
import {Item} from '../../store/items'

export const sumCountField = (list: Array<{count: number}>) =>
  list.reduce((sum, {count}) => sum + count, 0)

export const composeRequiredLvl = (skills: Skills, required: Item['skills']) =>
  skills.reduce((sum, {count, name}) => sum + Math.max(required[name] || 0, count), 0)
