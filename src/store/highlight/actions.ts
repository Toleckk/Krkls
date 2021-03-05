import {createAction} from '@reduxjs/toolkit'
import {Skill} from '../skills'
import {Item} from '../items'
import {ItemsHighlight, SkillsHighlight} from './types'

export const highlightSkills = createAction<{skills: SkillsHighlight}>('highlight/highlightSkills')
export const highlightItems = createAction<{items: ItemsHighlight}>('highlight/highlightItems')
export const highlightItemsForSkill = createAction<{items: Item[]; skill: Skill}>(
  'highlight/highlightItemsForSkill',
)
export const resetItems = createAction('highlight/resetItems')
export const resetSkills = createAction('highlight/resetSkills')
