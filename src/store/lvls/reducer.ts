import {createReducer} from '@reduxjs/toolkit'
import {Lvls} from './types'

export const createLvlsReducer = (initialState: Lvls) => createReducer(initialState, {})
