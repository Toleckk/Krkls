import React from 'react'
import {useDevicesContext} from './services/devices'

export const Devices = () => {
    const {devices} = useDevicesContext()

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {devices.map(d => (
                <span key={d.name} style={{color: d.available ? 'green' : 'red'}}>
          {d.name}
        </span>
            ))}
        </div>
    )
}
