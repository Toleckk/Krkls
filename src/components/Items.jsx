import React from 'react'
import {DrawerProvider} from '../services/drawer'
import {Panel} from '../ui/Panel'
import styles from './Items.module.css'
import {Loader} from '../ui/Loader'

const Devices = React.lazy(() => import('./Devices').then(m => ({default: m.Devices})))
const Weapons = React.lazy(() => import('./Weapons').then(m => ({default: m.Weapons})))
const Ships = React.lazy(() => import('./Ships').then(m => ({default: m.Ships})))
const ItemDrawer = React.lazy(() => import('../ui/ItemDrawer').then(m => ({default: m.ItemDrawer})))

const Suspense = ({Component}) => <React.Suspense fallback={<Loader />} children={<Component />} />

export const Items = () => (
  <DrawerProvider>
    <div className={styles.items}>
      <div className={styles.column}>
        <Panel title="Устройства" content={<Suspense Component={Devices} />} />
      </div>
      <div className={styles.column}>
        <Panel title="Оружие" content={<Suspense Component={Weapons} />} />
      </div>
    </div>
    <div className={styles.column}>
      <Panel title="Корабли" content={<Suspense Component={Ships} />} />
    </div>
    <React.Suspense fallback={<></>}>
      <ItemDrawer />
    </React.Suspense>
  </DrawerProvider>
)
