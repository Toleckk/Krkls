import {createSelector} from '@reduxjs/toolkit'
import {Highlight} from './types'

export const selectHighlight = (store: {highlight: Highlight}): Highlight => store.highlight

export const selectItemHighlight = createSelector(selectHighlight, highlight =>
  'item' in highlight ? highlight.item : undefined,
)

export const selectSkillHighlight = createSelector(selectHighlight, highlight =>
  'skill' in highlight ? highlight.skill : undefined,
)
