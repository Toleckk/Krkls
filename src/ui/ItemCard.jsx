import React, {useEffect} from 'react'
import c from 'classnames'
import styles from './ItemCard.module.scss'
import {ItemSkill} from './ItemSkill'
import {useHighlightContext} from '../services/highlight'
import {useSkillsContext} from '../services/skills'
import {Effects} from './Effects'

export const ItemCard = ({item}) => {
    const {highlightSkills, resetSkillsHighlight} = useHighlightContext()
    const {addForItem, findSkill} = useSkillsContext()

    useEffect(() => {
        highlightSkills(item)
        return resetSkillsHighlight
    }, [item, highlightSkills, resetSkillsHighlight])

    const count = Object.keys(item.skills).map(key => {
        const count = findSkill(key).count
        return item.skills[key] > count ? item.skills[key] - count : 0
    }).reduce((a, b) => a + b, 0) || undefined

    return (
        <div className={styles.modal}>
            <div className={styles.title}>
                <div className={styles.image}>
                    <img src={item.bigImage || item.image} alt={item.name}/>
                </div>
                <span className={styles.name}>{item.name}</span>
            </div>
            <span className={styles.divider}/>
            <div className={styles.info}>
                <div className={styles.scrollable}>
                    {
                        item.info ? (
                                <>
                                    <table>
                                        <tbody>
                                        {Object.keys(item.info).map(key => (
                                            <tr key={key}>
                                                <td>{key}</td>
                                                <td style={{textAlign: 'end'}}>{item.info[key]}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                    <Effects item={item}/>
                                </>
                            )
                            : <span style={{textAlign: 'center'}}>Информации пока нет!</span>
                    }
                </div>
                <span className={c(styles.divider, styles.adaptive)}/>
                <div className={styles.skills}>
                    <table className={styles.table}>
                        <tbody>{
                            Object.keys(item.skills)
                                .map(key => ({name: key, count: item.skills[key]}))
                                .map(skill => <ItemSkill skill={skill} key={skill.name}/>)
                        }</tbody>
                    </table>
                    {count && <button className={styles.apply} onClick={() => addForItem(item)} title="Добавить">
                        <span className={styles.count}>+{count}</span>
                    </button>}
                </div>
            </div>
            <span className={c(styles.divider, styles.mobile)}/>
        </div>
    )
}