import React, {useEffect, useMemo, useState} from 'react'
import styles from './Item.module.css'
import {useSkillsContext} from '../services/skills'

export const Item = ({item}) => {
    const {addForItem} = useSkillsContext()

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

    const className = styles.item + (item.available ? (' ' + styles.available) : '')
    const onClick = () => addForItem(item)

    return (
        <button className={className} title={item.name} onClick={onClick}>{
            loaded && <div role="img" style={style} className={styles.image}/>
        }</button>
    )
}
