import React from 'react'
import {DrawerProvider} from '../services/drawer'
import {Panel} from '../ui/Panel'
import {ItemDrawer} from '../ui/ItemDrawer'
import styles from './Items.module.css'
import {Loader} from '../ui/Loader'

const Devices = React.lazy(() => import('./Devices').then(m => ({default: m.Devices})))
const Weapons = React.lazy(() => import('./Weapons').then(m => ({default: m.Weapons})))
const Ships = React.lazy(() => import('./Ships').then(m => ({default: m.Ships})))

const Suspense = ({children}) => <React.Suspense fallback={<Loader/>}>{children}</React.Suspense>

export const Items = () => (
    <DrawerProvider>
        <div className={styles.items}>
            <div className={styles.column}>
                <Panel title="Устройства" content={<Suspense><Devices/></Suspense>}/>
            </div>
            <div className={styles.column}>
                <Panel title="Оружие" content={<Suspense><Weapons/></Suspense>}/>
            </div>
        </div>
        <div className={styles.column}>
            <Panel title="Корабли" content={<Suspense><Ships/></Suspense>}/>
        </div>
        <ItemDrawer/>
    </DrawerProvider>
)