import {createSelector} from '@reduxjs/toolkit'
import {Highlight} from './types'

export const selectHighlight = (store: {highlight: Highlight}): Highlight => store.highlight

export const selectItemHighlight = createSelector(selectHighlight, ({item}) => item)

export const selectSkillHighlight = createSelector(selectHighlight, ({skill}) => skill)
