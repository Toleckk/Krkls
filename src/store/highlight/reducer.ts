import {createReducer, PayloadAction} from '@reduxjs/toolkit'
import {highlightItem, highlightSkill, reset} from './actions'
import {Highlight, ItemHighlight, SkillHighlight} from './types'

export const createHighlightReducer = (initialState: Highlight) =>
  createReducer(initialState, {
    [highlightItem.type]: (state, action: PayloadAction<ItemHighlight>) => action.payload,
    [highlightSkill.type]: (state, action: PayloadAction<SkillHighlight>) => action.payload,
    [reset.type]: () => initialState,
  })
