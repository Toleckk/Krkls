import React from 'react'
import {Lvl} from './Lvl'
import {Control} from './Control'
import styles from './Header.module.css'

export const Header = () => (
    <header className={styles.header}>
        <Lvl/>
        <Control/>
    </header>
)