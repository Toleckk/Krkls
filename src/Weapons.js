import React from 'react'
import {useWeaponsContext} from './services/weapons'
import {List} from './List'

export const Weapons = () => {
    const {weapons} = useWeaponsContext()

    return <List items={weapons}/>
}
