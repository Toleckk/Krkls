import React from 'react'
import {Devices} from './Devices'
import {Weapons} from './Weapons'
import styles from './Items.module.css'

export const Items = () => (
    <div className={styles.items}>
        <div className={styles.column}>
            <span>Устройства:</span>
            <Devices/>
        </div>
        <div className={styles.column}>
            <span>Оружие:</span>
            <Weapons/>
        </div>
    </div>
)