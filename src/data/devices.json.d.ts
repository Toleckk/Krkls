export type DeviceData = {
  name: string
  skills: Record<string, number>
  info: Record<string, string | number | undefined>
  image: string
  effects: string[]
}

declare const devicesData: DeviceData[]

export default devicesData
