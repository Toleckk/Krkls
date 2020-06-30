import React from 'react'
import {Devices} from './Devices'
import {Weapons} from './Weapons'
import {Ships} from './Ships'
import styles from './Items.module.css'
import {Panel} from '../ui/Panel'

export const Items = () => (
    <>
        <div className={styles.items}>
            <div className={styles.column}>
                <Panel title="Устройства" content={<Devices/>}/>
            </div>
            <div className={styles.column}>
                <Panel title="Оружие" content={<Weapons/>}/>
            </div>
        </div>
        <div className={styles.column}>
            <Panel title="Корабли" content={<Ships/>}/>
        </div>
    </>
)