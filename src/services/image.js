import {useEffect, useMemo, useState} from 'react'

export const useItemImage = (item, max = 41) => {
    const [image, setImage] = useState(null)
    const [fit, setFit] = useState(false)

    const src = item.image || '/images/unknown.png'

    useEffect(() => {
        const img = new Image()
        img.onload = () => setImage(image)
        img.src = src
    }, [item.image, src])

    useEffect(() => setFit(image && (image.height < max && image.width < max)), [image])

    const style = useMemo(
        () => ({backgroundImage: `url(${src})`, backgroundSize: fit ? 'auto' : 'contain'}),
        [fit, src],
    )

    return {style, loaded: !!image}
}