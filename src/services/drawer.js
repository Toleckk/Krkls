import React, {createContext, useCallback, useContext, useMemo, useState} from 'react'
import {useHistory, useLocation} from 'react-router'

export const DrawerContext = createContext(null)

export const useDrawer = () => useContext(DrawerContext)

export const DrawerProvider = ({children}) => {
    const [item, setItem] = useState(null)
    const location = useLocation()
    const history = useHistory()

    const opened = location.hash === '#drawer'
    const setOpened = useCallback(is => {
        if(is && !opened)
            history.push(location.pathname + '#drawer')
        else if (!is && opened)
            history.push(location.pathname)
    }, [history, opened, location])

    const open = useCallback(() => setOpened(true), [setOpened])
    const close = useCallback(() => setOpened(false), [setOpened])

    const value = useMemo(() => ({item, setItem, open, close, opened}), [item, setItem, opened, open, close])

    return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
}