import React, {useCallback, useState} from 'react'
import {ModalContext} from './ModalContext'
import {Close, ModalProps, Modals, Open, OwnModalProps} from './types'

export const ModalProvider: React.FC = ({children}) => {
  const [modals, setModals] = useState<Modals>([])

  const open = useCallback<Open>(
    <P extends ModalProps>(name: string, props?: OwnModalProps<P>) =>
      setModals(modals =>
        modals
          .filter(modal => modal.name !== name)
          .concat({
            name,
            props,
          }),
      ),
    [setModals],
  )
  const close = useCallback<Close>(
    (name: string) => setModals(modals => modals.filter(modal => modal.name !== name)),
    [setModals],
  )

  return <ModalContext.Provider value={{open, close, modals}}>{children}</ModalContext.Provider>
}
