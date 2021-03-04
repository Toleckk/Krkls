import type {SkillName} from './skills.json'

export type WeaponData = {
  name: string
  skills: Partial<Record<SkillName, number>>
  info: Record<string, string | number>
  image: string
  effects?: string[]
}

declare const weaponsData: WeaponData[]

export default weaponsData
