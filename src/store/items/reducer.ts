import {createReducer} from '@reduxjs/toolkit'
import {Items} from './types'

export const createItemsReducer = (initialState: Items) => createReducer(initialState, {})
