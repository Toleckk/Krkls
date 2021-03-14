import React, {ComponentType, useCallback, useState} from 'react'
import {ModalContext} from './ModalContext'
import {Close, ModalProps, Modals, Open, OwnModalProps} from './types'

export const ModalProvider: React.FC = ({children}) => {
  const [modals, setModals] = useState<Modals>([])

  const open = useCallback<Open>(
    <P extends ModalProps>(component: ComponentType<P>, props?: OwnModalProps<P>) =>
      setModals(modals =>
        modals
          .filter(modal => modal.component !== component)
          .concat({
            component,
            props,
          }),
      ),
    [setModals],
  )
  const close = useCallback<Close>(
    component => setModals(modals => modals.filter(modal => modal.component !== component)),
    [setModals],
  )

  return <ModalContext.Provider value={{open, close, modals}}>{children}</ModalContext.Provider>
}
