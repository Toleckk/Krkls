import React from 'react'
import {Drawer} from './Drawer'
import {DrawerContext} from '../services/drawer'
import {ItemCard} from './ItemCard'
import styles from './ItemDrawer.module.css'


export const ItemDrawer = () => (
    <DrawerContext.Consumer>{({item, setItem}) => (
        <Drawer
            placement="css"
            visible={!!item}
            onClose={() => setItem(null)}
            delay={300}
            className={styles.drawer}
        >
            <ItemCard item={item}/>
        </Drawer>
    )}</DrawerContext.Consumer>
)