import React from 'react'
import styles from './List.module.css'
import {Item} from './Item'

export const List = ({items, makeKey = item => item.name}) => (
    <ul className={styles.list}>{
        items.map(item => <li key={makeKey(item)} className={styles.item}><Item item={item}/></li>)
    }</ul>
)