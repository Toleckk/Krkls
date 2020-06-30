import React, {createContext, useContext, useMemo, useState} from 'react'
import defaultDevices from '../data/devices.json'
import {useAvailable} from './items'

export const DevicesContext = createContext(null)

export const useDevicesContext = () => useContext(DevicesContext)

export const DevicesContextProvider = ({children}) => {
    const [devices, setDevices] = useState(defaultDevices)

    const availableDevices = useAvailable(devices)

    const value = useMemo(() => ({devices: availableDevices, setDevices}), [availableDevices, setDevices])

    return <DevicesContext.Provider value={value}>{children}</DevicesContext.Provider>
}
