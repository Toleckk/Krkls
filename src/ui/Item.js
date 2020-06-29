import React, {useMemo, useState, useEffect} from 'react'
import styles from './Item.module.css'

export const Item = ({item}) => {
    const [image, setImage] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [fit, setFit] = useState(false)

    const src = item.image || '/images/unknown.png'

    useEffect(() => {
        const img = new Image()
        img.onload = () => setLoaded(true)
        img.src = src
        setImage(img)
    }, [item.image])

    useEffect(() => setFit(loaded && (image.height < 41 && image.width < 41)), [loaded])

    const style = useMemo(
        () => ({backgroundImage: `url(${src})`, backgroundSize: fit ? 'auto' : 'contain'}),
        [item.image, fit]
    )

    return (
        <button className={styles.item + (item.available ? (' ' + styles.available) : '')} title={item.name}>{
            loaded && <div role="img" style={style} className={styles.image}/>
        }</button>
    )
}
