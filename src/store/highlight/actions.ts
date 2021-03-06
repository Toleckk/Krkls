import {createAction} from '@reduxjs/toolkit'
import {SkillName} from '../../data/skills.json'
import {Item} from '../items'

export const highlightSkill = createAction<{skill: SkillName}>('highlight/highlightSkill')
export const highlightItem = createAction<{item: Pick<Item, 'skills'>}>('highlight/highlightItem')
export const reset = createAction('highlight/reset')
