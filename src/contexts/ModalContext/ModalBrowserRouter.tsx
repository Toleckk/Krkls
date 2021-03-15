import React, {useCallback, useMemo} from 'react'
import {useHistory, useLocation} from 'react-router'
import {parse, stringify} from 'query-string'
import {ModalContext} from './ModalContext'
import {Open} from './types'

export const ModalBrowserRouter: React.FC = ({children}) => {
  const {pathname, search} = useLocation()
  const history = useHistory()

  const params = useMemo(() => parse(search), [search])

  const modals = useMemo(() => {
    return Object.keys(params).map(name => {
      const param = params[name]

      return {name, props: typeof param === 'string' ? JSON.parse(param) : params}
    })
  }, [params])

  const open = useCallback<Open>(
    (name: string, props?: string | Record<string, unknown>) =>
      history.push({
        pathname,
        search: stringify({
          ...params,
          [name]: JSON.stringify(props),
        }),
      }),
    [history, params, pathname],
  )

  const close = useCallback(
    (name: string) =>
      history.push({
        pathname,
        search: stringify({
          ...params,
          [name]: undefined,
        }),
      }),
    [history, params, pathname],
  )

  return <ModalContext.Provider value={{open, modals, close}}>{children}</ModalContext.Provider>
}
