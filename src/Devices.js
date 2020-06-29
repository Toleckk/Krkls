import React from 'react'
import {useDevicesContext} from './services/devices'
import {List} from './ui/List'

export const Devices = () => {
    const {devices} = useDevicesContext()
    return <List items={devices}/>
}
