export type SkillsHighlight = {
  skill: string
  item?: undefined
}

export type ItemsHighlight = {
  item: string
  skill?: undefined
}

export type Highlight = SkillsHighlight | ItemsHighlight | {item?: undefined; skill?: undefined}
