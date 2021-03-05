import {Highlight} from './types'

export const selectHighlightedItems = (state: {highlight: Highlight}) => state.highlight.items

export const selectHighlightedSkills = (state: {highlight: Highlight}) => state.highlight.skills
