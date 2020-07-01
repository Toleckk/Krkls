import React, {useEffect, useMemo, useState} from 'react'
import classNames from 'classnames'
import styles from './Item.module.css'
import {useSkillsContext} from '../services/skills'
import {useHighlight} from '../services/highlight'
import {Button} from './Button'

export const Item = ({item}) => {
    const {addForItem, findSkill} = useSkillsContext()

    const [image, setImage] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [fit, setFit] = useState(false)

    const src = item.image || '/images/unknown.png'

    useEffect(() => {
        const img = new Image()
        img.onload = () => setLoaded(true)
        img.src = src
        setImage(img)
    }, [item.image, src])

    useEffect(() => setFit(loaded && (image.height < 41 && image.width < 41)), [loaded, image])

    const style = useMemo(
        () => ({backgroundImage: `url(${src})`, backgroundSize: fit ? 'auto' : 'contain'}),
        [fit, src],
    )

    const {highlightSkills, resetSkillsHighlight} = useHighlight()
    const onMouseEnter = () => highlightSkills(item)

    return (
        <Button available={item.available}
            className={classNames(styles.item, {[styles.highlighted]: item.required})}
            title={item.name}
            onClick={() => addForItem(item)}
            onMouseEnter={onMouseEnter}
            onMouseLeave={resetSkillsHighlight}
        >
            {loaded && <div role="img" style={style} className={styles.image}/>}
            <div className={classNames(styles.highlight, {
                [styles.visible]: item.required,
                [styles.available]: item.required && (item.required.count <= findSkill(item.required.name).count),
            })}>{
                item.required && item.required.count
            }</div>
        </Button>
    )
}
