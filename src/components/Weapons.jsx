import React from 'react'
import {useAppSelector} from '../store'
import {List} from '../ui/List'
import {selectWeapons} from '../store/items'

export const Weapons = () => {
  const weapons = useAppSelector(selectWeapons)

  return <List items={weapons} />
}
