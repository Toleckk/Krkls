import React, {createContext, useContext, useMemo} from 'react'
import defaultDevices from '../data/devices.json'
import {useAvailable} from './items'

export const DevicesContext = createContext(null)

export const useDevicesContext = () => useContext(DevicesContext)

export const DevicesContextProvider = ({children}) => {
    const devices = useAvailable(defaultDevices)

    const value = useMemo(() => ({devices}), [devices])

    return <DevicesContext.Provider value={value}>{children}</DevicesContext.Provider>
}
