import React from 'react'
import {useDevicesContext} from './services/devices'
import {List} from './List'

export const Devices = () => {
    const {devices} = useDevicesContext()
    return <List items={devices}/>
}
