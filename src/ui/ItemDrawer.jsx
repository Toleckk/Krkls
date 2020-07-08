import React from 'react'
import {Drawer} from './Drawer'
import {DrawerContext} from '../services/drawer'
import {ItemCard} from './ItemCard'
import styles from './ItemDrawer.module.scss'
import {Icon} from './Icon'


export const ItemDrawer = () => (
    <DrawerContext.Consumer>{({item, close, opened}) => (
        <Drawer
            placement="css"
            visible={opened}
            onClose={close}
            delay={300}
            className={styles.drawer}
        >
            <ItemCard item={item}/>
            <button className={styles.close} onClick={close}>
                <Icon icon="hide" className={styles.icon}/>
            </button>
        </Drawer>
    )}</DrawerContext.Consumer>
)