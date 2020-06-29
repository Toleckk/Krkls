import React from 'react'
import styles from './List.module.css'
import {Item} from './Item'

export const List = ({items}) => (
    <ul className={styles.list}>{
        items.map(item => <li key={item.name} className={styles.item}><Item item={item}/></li>)
    }</ul>
)