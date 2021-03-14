import {useCallback} from 'react'
import {nanoid} from 'nanoid'
import {OwnModalProps, useModal, UseModalResult} from '../../contexts/ModalContext'
import {TextAlert, TextAlertProps} from '../../modals/TextAlert'

export type UseAlertResult = Omit<UseModalResult<TextAlertProps>, 'open' | 'props'> & {
  open: (props: Omit<OwnModalProps<TextAlertProps>, 'id'>) => void
}

export const useAlert = () => {
  const {close, open: openModal, isOpened} = useModal(TextAlert)

  const open = useCallback(({text, delay}) => openModal({id: nanoid(), text, delay}), [openModal])

  return {
    open,
    close,
    isOpened,
  }
}
