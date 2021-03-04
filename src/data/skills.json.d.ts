export type SkillName =
  | 'Точность'
  | 'Уклонение'
  | 'Наведение'
  | 'Механика'
  | 'Биохимия'
  | 'Кибернетика'
  | 'Электроника'
  | 'Пилотирование'
  | 'Добыча'
  | 'Торговля'
  | 'Ремонт'
  | 'Кинетическое'
  | 'Энергетическое'
  | 'Ракетное'
  | 'Тактика'
  | 'Контроль'

export type Skill = {
  name: SkillName
  group: number
  limit: number
  max?: number
  count: number
}

export type Skills = Skill[]

declare const skillsData: Skills
export default skillsData
