import {useCallback, useContext} from 'react'
import {Exact} from '../../../utils/Exact'
import {ModalContext} from './ModalContext'
import {Modal, ModalProps, OwnModalProps} from './types'

export type BoundOpen<P extends ModalProps> = Exact<P, ModalProps> extends never
  ? (props: OwnModalProps<P>) => void
  : () => void

export type BoundClose = () => void

export type UseModalResult<P extends ModalProps> = {
  open: BoundOpen<P>
  close: BoundClose
  isOpened: boolean
  props?: OwnModalProps<P>
}

export const useModal = <P extends ModalProps>(name: string): UseModalResult<P> => {
  const {modals, open: openModal, close: closeModal} = useContext(ModalContext)
  const modal: undefined | Modal = modals.find(modal => modal.name === name)

  const open = useCallback<any>((props: any) => openModal(name, props), [name, openModal])
  const close = useCallback<BoundClose>(() => closeModal(name), [name, closeModal])

  return {
    open,
    close,
    isOpened: !!modal,
    props: modal?.props as OwnModalProps<P>,
  }
}
