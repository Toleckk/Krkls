import React from 'react'
import {List} from '../ui/List'
import {useItems} from '../services/items'

export const Devices = () => {
  const {devices} = useItems()
  return <List items={devices} />
}
