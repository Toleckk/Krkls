import React, {useEffect, useState} from 'react'
import {FocusVisibleContext} from './FocusVisibleContext'

export const FocusVisibleProvider: React.FC = ({children}) => {
  const [hadKeyboardEvent, setHadKeyboardEvent] = useState(false)

  useEffect(() => {
    const onPointerDown = () => setHadKeyboardEvent(false)

    const onInitialPointerMove = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null
      if (!target?.nodeName || target.nodeName.toLowerCase() !== 'html') {
        setHadKeyboardEvent(false)
        removeInitialPointerMoveListeners()
      }
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

    const onKeyDown = (e: KeyboardEvent) => {
      if (!e.metaKey && !e.altKey && !e.ctrlKey) {
        setHadKeyboardEvent(true)
      }
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
