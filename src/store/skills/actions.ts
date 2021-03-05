import {createAction} from '@reduxjs/toolkit'
import type {SkillName} from '../../data/skills.json'
import {Skills} from './types'

export const increment = createAction<{name: SkillName}>('skills/increment')
export const decrement = createAction<{name: SkillName}>('skills/decrement')
export const add = createAction<{skills: Skills}>('skills/add')
export const reset = createAction('skills/reset')
