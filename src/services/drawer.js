import React, {createContext, useCallback, useContext, useEffect, useState} from 'react'
import {useHistory, useLocation} from 'react-router'

export const DrawerContext = createContext(null)

export const useDrawer = () => useContext(DrawerContext)

export const DrawerProvider = ({children}) => {
    const [item, setItem] = useState(null)
    const location = useLocation()
    const history = useHistory()

    const open = useCallback(() => location.hash !== '#drawer' && history.push(location.pathname + '#drawer'), [history, location])
    const close = useCallback(() => location.hash === '#drawer' && history.push(location.pathname), [history, location])

    useEffect(() => {
        const listener = e => (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27) && close()
        document.addEventListener('keydown', listener)
        return () => document.removeEventListener('keydown', listener)
    }, [history, location, close])

    const value = {item, setItem, open, close, opened: location.hash === '#drawer'}

    return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
}