import {useCallback} from 'react'
import {nanoid} from 'nanoid'
import {OwnModalProps, useModal, UseModalResult} from '@krkls/contexts/ModalContext'
import {TextAlertProps} from '@krkls/modals/TextAlert'

export type UseAlertResult = Omit<UseModalResult<TextAlertProps>, 'open' | 'props'> & {
  open: (props: Omit<OwnModalProps<TextAlertProps>, 'id'>) => void
}

export const useAlert = (): UseAlertResult => {
  const {close, open: openModal, isOpened} = useModal<TextAlertProps>('text alert')

  const open = useCallback(({text, delay}) => openModal({id: nanoid(), text, delay}), [openModal])

  return {
    open,
    close,
    isOpened,
  }
}
