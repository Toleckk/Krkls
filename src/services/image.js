import {useEffect, useMemo, useState} from 'react'

export const useItemImage = (item, max = 41) => {
    const [image, setImage] = useState(null)

    const src = item.image || '/images/unknown.png'

    useEffect(() => {
        const image = new Image()
        image.onload = () => setImage(image)
        image.src = src
    }, [item.image, src])

    const sizes = useMemo(
        () => {
            if(!image)
                return {}

            if(image.height > max && image.height > image.width)
                return {height: max + 'px', width: 'auto'}

            if(image.width > max || image.height > max)
                return {height: 'auto', width: max + 'px'}

            return {height: image.height, width: image.width}
        },
        [image, max],
    )

    return {sizes, loaded: !!image}
}