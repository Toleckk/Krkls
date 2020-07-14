import React, {useEffect} from 'react'
import {Drawer} from './Drawer'
import {useDrawer} from '../services/drawer'
import {ItemCard} from './ItemCard'
import styles from './ItemDrawer.module.scss'
import {Icon} from './Icon'
import {useHighlightContext} from '../services/highlight'
import {Redirect, useLocation} from 'react-router'


export const ItemDrawer = () => {
    const {item, close, opened} = useDrawer()
    const {highlightSkills, resetSkillsHighlight} = useHighlightContext()
    const location = useLocation()

    useEffect(() => {
        if(item && opened) {
            highlightSkills(item)
            return resetSkillsHighlight
        }
    }, [item, highlightSkills, resetSkillsHighlight, opened])

    if(!item)
        return <Redirect to={location.pathname}/>

    return (
        <Drawer
            placement="css"
            visible={opened}
            onClose={close}
            delay={150}
            className={styles.drawer}
        >
            <ItemCard item={item}/>
            <button className={styles.close} onClick={close}>
                <Icon icon="hide" className={styles.icon}/>
            </button>
        </Drawer>
    )
}