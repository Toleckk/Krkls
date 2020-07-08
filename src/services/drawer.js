import React, {createContext, useCallback, useContext, useMemo, useState} from 'react'

export const DrawerContext = createContext(null)

export const useDrawer = () => useContext(DrawerContext)

export const DrawerProvider = ({children}) => {
    const [item, setItem] = useState(null)
    const [opened, setOpened] = useState(false)

    const open = useCallback(() => setOpened(true), [setOpened])
    const close = useCallback(() => setOpened(false), [setOpened])

    const value = useMemo(() => ({item, setItem, open, close, opened}), [item, setItem, opened, open, close])

    return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
}