import {createAction} from '@reduxjs/toolkit'

export const increment = createAction<{name: string}>('skills/increment')
export const decrement = createAction<{name: string}>('skills/decrement')
export const add = createAction<{skills: Array<{name: string; count: number}>}>('skills/add')
export const reset = createAction('skills/reset')
