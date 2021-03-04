import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {useCallback, useRef} from 'react'
import {store} from './store'

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector

export const useAction = <A extends (...args: any[]) => any>(
  createAction: A,
): ((...args: Parameters<A>) => void) => {
  const createActionRef = useRef(createAction)
  createActionRef.current = createAction

  const dispatch = useDispatch()

  return useCallback(
    (...args: Parameters<A>) => {
      return dispatch(createActionRef.current(...args))
    },
    [dispatch, createActionRef],
  )
}