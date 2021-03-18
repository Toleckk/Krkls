import {createReducer, Reducer} from '@reduxjs/toolkit'
import {Lvls} from './types'

export const createLvlsReducer = (initialState: Lvls): Reducer<Lvls> =>
  createReducer(initialState, {})
