import {useContext} from 'react'
import {useBooleanState} from 'use-boolean-state'
import {FocusVisibleContext} from './FocusVisibleContext'

export const useFocusVisible = () => {
  const {hadKeyboardEvent, isInitialized} = useContext(FocusVisibleContext)

  const [isFocused, onFocus, onBlur] = useBooleanState(false)

  return {
    focusVisible: isInitialized ? hadKeyboardEvent && isFocused : isFocused,
    onFocus,
    onBlur,
  }
}
