import {ComponentType, useCallback, useContext} from 'react'
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

export const useModal = <P extends ModalProps>(component: ComponentType<P>): UseModalResult<P> => {
  const {modals, open: openModal, close: closeModal} = useContext(ModalContext)
  const modal: undefined | Modal<P> = modals.find(modal => modal.component === component)

  const open = useCallback<any>((props: any) => openModal(component, props), [component, openModal])
  const close = useCallback<BoundClose>(() => closeModal(component), [component, closeModal])

  return {
    open,
    close,
    isOpened: !!modal,
    props: modal?.props,
  }
}
