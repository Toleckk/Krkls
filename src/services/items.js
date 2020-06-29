import {useMemo} from 'react'
import {useSkillsContext} from './skills'

export const useAvailable = defaultItems => {
    const {isItemAvailable} = useSkillsContext()

    return useMemo(() => defaultItems
        .map(item => ({...item, available: isItemAvailable(item)}))
        .sort((a, b) => {
            if (a.available === b.available)
                return 0
            if (a.available)
                return -1
            return 1
        }), [defaultItems, isItemAvailable])
}