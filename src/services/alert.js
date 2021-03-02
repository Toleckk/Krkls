import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react'

export const AlertContext = createContext(null)

export const useAlert = () => useContext(AlertContext)

export const AlertProvider = ({children}) => {
  const [tip, setTip] = useState(null)

  const open = useCallback(
    (text, onClose = () => {}, delay = 3000, Component = null) => {
      setTip(null)
      setTip({text, Component, delay, onClose})
    },
    [setTip],
  )

  const close = useCallback(() => setTip(null), [setTip])

  useEffect(() => {
    if (tip) {
      const timeout = setTimeout(() => {
        setTip(null)
        tip.onClose()
      }, tip.delay)

      return () => clearTimeout(timeout)
    }
  }, [tip])

  const value = useMemo(() => ({tip, open, close}), [tip, open, close])

  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
}
