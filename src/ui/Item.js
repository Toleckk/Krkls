import React from 'react'
import styles from './Item.module.css'

export const Item = ({item}) => (
    <button className={styles.item + (item.available ? (' ' + styles.available) : '')} title={item.name}>
        <img src={item.image || "/images/unknown.png"} alt={item.name} width="100%"/>
    </button>
)