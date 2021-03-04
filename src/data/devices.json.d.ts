import type {SkillName} from './skills.json'

export type DeviceData = {
  name: string
  skills: Partial<Record<SkillName, number>>
  info: Record<string, string | number | undefined>
  image: string
  effects: string[]
}

declare const devicesData: DeviceData[]

export default devicesData
