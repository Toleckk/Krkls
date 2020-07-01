import React from 'react'
import {Lvl} from './Lvl'
import {Reset} from './Reset'
import {Undo} from './Undo'
import {Redo} from './Redo'
import styles from './Header.module.css'

export const Header = () => (
    <header className={styles.header}>
        <Lvl/>
        <div>
            <Undo/>
            <Reset/>
            <Redo/>
        </div>
    </header>
)