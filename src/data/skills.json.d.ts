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

export type SkillData = {
  name: string
  group: number
  limit: number
  max?: number
}

declare const skillsData: SkillData[]
export default skillsData
