import React from 'react'
import classNames from 'classnames'
import styles from './Item.module.scss'
import {useSkillsContext} from '../services/skills'
import {useHighlightContext} from '../services/highlight'
import {Button} from './Button'
import {useItemImage} from '../services/image'

export const Item = ({item}) => {
    const {addForItem, findSkill} = useSkillsContext()

    const {sizes, loaded} = useItemImage(item)

    const {highlightSkills, resetSkillsHighlight, highlightedItems} = useHighlightContext()
    const onMouseEnter = () => highlightSkills(item)

    const {available, name} = item
    const required = highlightedItems[name]

    return (
        <Button available={available}
            className={classNames(styles.item, {[styles.highlighted]: required})}
            title={name}
            onClick={() => addForItem(item)}
            onMouseEnter={onMouseEnter}
            onMouseLeave={resetSkillsHighlight}
        >
            {loaded && <img style={sizes} src={item.image} alt={item.name}/>}
            <div className={classNames(styles.highlight, {
                [styles.visible]: required,
                [styles.available]: required && (required.count <= findSkill(required.name).count),
            })}>{
                required && required.count
            }</div>
        </Button>
    )
}