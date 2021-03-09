import {createAction} from '@reduxjs/toolkit'
import {Skills} from './types'

export const increment = createAction<{name: string}>('skills/increment')
export const decrement = createAction<{name: string}>('skills/decrement')
export const add = createAction<{skills: Skills}>('skills/add')
export const reset = createAction('skills/reset')
