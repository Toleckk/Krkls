import {useMemo} from 'react'
import {useSkillsContext} from './skills'

export const useAvailable = items => {
    const {isItemAvailable} = useSkillsContext()

    return useMemo(() => items
        .map(item => ({...item, available: isItemAvailable(item)}))
        .sort((a, b) => {
            if (a.available === b.available)
                return 0
            if (a.available)
                return -1
            return 1
        }), [items, isItemAvailable])
}