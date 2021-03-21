import {createReducer, Reducer} from '@reduxjs/toolkit'
import {Items} from './types'

export const createItemsReducer = (initialState: Items): Reducer<Items> =>
  createReducer(initialState, {})
