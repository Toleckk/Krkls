import React, {useContext, useEffect, useState} from 'react'

export const FocusVisibleContext = React.createContext({
  hadKeyboardEvent: true,
  isInitialized: false,
})

export const FocusVisibleProvider = ({children}) => {
  const [hadKeyboardEvent, setHadKeyboardEvent] = useState(true)

  useEffect(() => {
    const onPointerDown = () => setHadKeyboardEvent(false)

    const onInitialPointerMove = e => {
      if (e.target.nodeName && e.target.nodeName.toLowerCase() === 'html') return

      setHadKeyboardEvent(false)
      removeInitialPointerMoveListeners()
    }

    const addInitialPointerMoveListeners = () => {
      document.addEventListener('mousemove', onInitialPointerMove)
      document.addEventListener('mousedown', onInitialPointerMove)
      document.addEventListener('mouseup', onInitialPointerMove)
      document.addEventListener('pointermove', onInitialPointerMove)
      document.addEventListener('pointerdown', onInitialPointerMove)
      document.addEventListener('pointerup', onInitialPointerMove)
      document.addEventListener('touchmove', onInitialPointerMove)
      document.addEventListener('touchstart', onInitialPointerMove)
      document.addEventListener('touchend', onInitialPointerMove)
    }

    const removeInitialPointerMoveListeners = () => {
      document.removeEventListener('mousemove', onInitialPointerMove)
      document.removeEventListener('mousedown', onInitialPointerMove)
      document.removeEventListener('mouseup', onInitialPointerMove)
      document.removeEventListener('pointermove', onInitialPointerMove)
      document.removeEventListener('pointerdown', onInitialPointerMove)
      document.removeEventListener('pointerup', onInitialPointerMove)
      document.removeEventListener('touchmove', onInitialPointerMove)
      document.removeEventListener('touchstart', onInitialPointerMove)
      document.removeEventListener('touchend', onInitialPointerMove)
    }

    const onKeyDown = e => {
      if (e.metaKey || e.altKey || e.ctrlKey) return

      setHadKeyboardEvent(true)
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setHadKeyboardEvent(true)
        addInitialPointerMoveListeners()
      }
    }

    document.addEventListener('keydown', onKeyDown, true)
    document.addEventListener('mousedown', onPointerDown, true)
    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('touchstart', onPointerDown, true)
    document.addEventListener('visibilitychange', onVisibilityChange, true)

    addInitialPointerMoveListeners()

    return () => {
      document.removeEventListener('keydown', onKeyDown, true)
      document.removeEventListener('mousedown', onPointerDown, true)
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('touchstart', onPointerDown, true)
      document.removeEventListener('visibilitychange', onVisibilityChange, true)

      removeInitialPointerMoveListeners()
    }
  }, [setHadKeyboardEvent])

  return (
    <FocusVisibleContext.Provider value={{hadKeyboardEvent, isInitialized: true}}>
      {children}
    </FocusVisibleContext.Provider>
  )
}

export default function useFocusVisible() {
  const [isFocused, setIsFocused] = useState(false)
  const {hadKeyboardEvent, isInitialized} = useContext(FocusVisibleContext)

  const onFocus = () => setIsFocused(true)
  const onBlur = () => setIsFocused(false)

  return {
    focusVisible: isInitialized ? hadKeyboardEvent && isFocused : isFocused,
    onFocus,
    onBlur,
  }
}
