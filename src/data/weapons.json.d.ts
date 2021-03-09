export type WeaponData = {
  name: string
  skills: Record<string, number>
  info: Record<string, string | number | undefined>
  image: string
  effects?: string[]
}

declare const weaponsData: WeaponData[]

export default weaponsData
