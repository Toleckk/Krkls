import React, {useEffect} from 'react'
import {useHistory} from 'react-router'
import {Provider} from 'react-redux'
import {store} from './store'

export const StoreProvider: React.FC = ({children}) => {
  const history = useHistory()

  useEffect(
    () =>
      store.subscribe(() => {
        const {pathname} = history.location

        const newPathName = `/${store
          .getState()
          .skills.present.map(skill => skill.count.toString(13))
          .join('')}`

        if (pathname !== newPathName) {
          history.replace(
            {
              pathname: newPathName,
              search: history.location.search,
            },
            history.location.state,
          )
        }
      }),
    [history],
  )

  return <Provider store={store}>{children}</Provider>
}
