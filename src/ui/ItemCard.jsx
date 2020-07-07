import React from 'react'
import styles from './ItemCard.module.scss'
import {useItemImage} from '../services/image'

export const ItemCard = ({item}) => {
    const {loaded, sizes} = useItemImage(item, 55)

    if (!item.info)
        return <span>Информации пока нет!</span>

    return (
        <div className={styles.modal}>
            <div className={styles.image}>
                {loaded && <img src={item.image} alt={item.name} style={sizes}/>}
            </div>
            <span className={styles.title}>{item.name}</span>
            <div className={styles.scrollable}>
                <table className={styles.table}>
                    <tbody>
                    {Object.keys(item.info).map(key => (
                        <tr key={key}>
                            <td>{key}</td>
                            <td style={{textAlign: 'end'}}>{item.info[key]}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <table className={styles.table}>
                    <tbody>
                    {Object.keys(item.skills).map(key => (
                        <tr key={key}>
                            <td>{key}:</td>
                            <td>{item.skills[key]}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}