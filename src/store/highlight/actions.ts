import {createAction} from '@reduxjs/toolkit'
import {ItemsHighlight, SkillsHighlight} from './types'

export const highlightSkill = createAction<SkillsHighlight>('highlight/highlightSkill')
export const highlightItem = createAction<ItemsHighlight>('highlight/highlightItem')
export const reset = createAction('highlight/reset')
