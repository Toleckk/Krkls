import React, {createContext, useContext, useMemo} from 'react'
import {useSkillsContext} from './skills'
import defaultDevices from '../data/devices.json'

export const DevicesContext = createContext(null)

export const useDevicesContext = () => useContext(DevicesContext)

export const DevicesContextProvider = ({children}) => {
    const {skills} = useSkillsContext()

    const devices = useMemo(
        () =>
            defaultDevices
                .map(d => {
                    const names = Object.keys(d.skills)
                    const requiredSkills = skills
                        .flat()
                        .filter(s => names.indexOf(s.name) !== -1)

                    return {
                        ...d,
                        available: requiredSkills.every(s => s.count >= d.skills[s.name]),
                    }
                })
                .sort((a, b) => {
                    if (a.available === b.available) return 0
                    if (a.available) return -1
                    return 1
                }),
        [skills],
    )

    const value = useMemo(() => ({devices}), [devices])

    return (
        <DevicesContext.Provider value={value}>{children}</DevicesContext.Provider>
    )
}
