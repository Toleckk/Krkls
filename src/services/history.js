import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react'
import {useHistory} from 'react-router'
import {BrowserRouter} from 'react-router-dom'

export const TrackableRouter = ({children, ...props}) => (
    <BrowserRouter {...props}>
        <Tracker>
            {children}
        </Tracker>
    </BrowserRouter>
)

export const TrackerContext = createContext(null)


const Tracker = ({children}) => {
    const history = useHistory()

    const [keys, setKeys] = useState(JSON.parse(sessionStorage.getItem('keys') || '[]'))
    const [prev, setPrev] = useState(null)

    useEffect(() => sessionStorage.setItem('keys', JSON.stringify(keys)), [keys])

    const onChange = useCallback(({key}, action) => {
        if (!key)
            return setPrev(null)

        if(action !== 'POP' || keys.includes(key)) {
            const index = keys.indexOf(prev)

            if (!keys.includes(key))
                setKeys([...keys, key])
            else if (action === 'PUSH' && index < keys.length - 1)
                setKeys([...keys.slice(0, index), key])
        }

        setPrev(key)
    }, [setKeys, keys, setPrev, prev])

    useEffect(() => history.listen(onChange), [history, onChange])

    const index = useMemo(() => keys.indexOf(prev), [keys, prev])

    const canGoBack = index >= 0
    const canGoForward = index < keys.length - 1

    const value = useMemo(() => ({canGoBack, canGoForward}), [canGoBack, canGoForward])

    return <TrackerContext.Provider value={value}>{children}</TrackerContext.Provider>
}


export const useCanGo = () => useContext(TrackerContext)