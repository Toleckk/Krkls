import React from 'react'
import {DrawerProvider} from '../services/drawer'
import {Devices} from './Devices'
import {Weapons} from './Weapons'
import {Ships} from './Ships'
import {Panel} from '../ui/Panel'
import styles from './Items.module.css'

export const Items = () => (
    <DrawerProvider>
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
    </DrawerProvider>
)