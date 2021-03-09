export type ShipData = {
  name: string
  race: string
  image: string
  skills: Record<string, number>
  info: Record<string, string | number | undefined>
}

declare const shipsData: ShipData[]

export default shipsData
