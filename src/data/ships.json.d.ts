import type {SkillName} from './skills.json'

export type ShipData = {
  name: string
  race: string
  image: string
  skills: Partial<Record<SkillName, number>>
  info: Record<string, string | number>
}

declare const shipsData: ShipData[]

export default shipsData
