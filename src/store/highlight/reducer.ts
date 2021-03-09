import {createReducer, PayloadAction} from '@reduxjs/toolkit'
import {highlightItem, highlightSkill, reset} from './actions'
import {Highlight, ItemsHighlight, SkillsHighlight} from './types'

export const createHighlightReducer = (initialState: Highlight) =>
  createReducer(initialState, {
    [highlightItem.type]: (_: unknown, action: PayloadAction<ItemsHighlight>) => action.payload,
    [highlightSkill.type]: (_: unknown, action: PayloadAction<SkillsHighlight>) => action.payload,
    [reset.type]: () => initialState,
  })
