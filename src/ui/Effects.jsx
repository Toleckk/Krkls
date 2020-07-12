import React from 'react'
import styles from './Effects.module.scss'

export const Effects = ({item}) => {
    if (!item.effects)
        return <></>

    return (
        <ul className={styles.list}>{
            item.effects.map((effect, i) => <li key={i} className={styles.item}>— {
                effect.split(/{|}/)
                    .filter(e => e)
                    .map((e, i) => (
                        e[0] === '|'
                            ? <span key={i} className={styles.colored}>{e.substr(1, e.length - 2)}</span>
                            : e
                    ))
            }</li>)
        }</ul>
    )
}