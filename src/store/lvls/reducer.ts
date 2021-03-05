import {Lvls} from './types'
import {createReducer} from '@reduxjs/toolkit'

export const createLvlsReducer = (initialState: Lvls) => createReducer(initialState, {})
