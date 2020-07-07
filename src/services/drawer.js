import React, {createContext, useContext, useMemo, useState} from 'react'

export const DrawerContext = createContext(null)

export const useDrawer = () => useContext(DrawerContext)

export const DrawerProvider = ({children}) => {
    const [item, setItem] = useState(null)

    const value = useMemo(() => ({item, setItem}), [item, setItem])

    return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
}