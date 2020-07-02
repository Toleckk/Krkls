import React from 'react'
import {List} from '../ui/List'
import {useItems} from '../services/items'

export const Weapons = () => {
    const {weapons} = useItems()

    return <List items={weapons}/>
}
