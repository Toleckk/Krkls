import React from 'react'
import {useAppSelector} from '../store'
import {List} from '../ui/List'
import {selectDevices} from '../store/items'

export const Devices = () => {
  const devices = useAppSelector(selectDevices)
  return <List items={devices} />
}
