import type {ComponentType} from 'react'
import {Exact} from '../../../utils/Exact'

export type Modal<P extends ModalProps = any> = {
  component: ComponentType<P>
  props?: OwnModalProps<P>
}

export type Modals = Modal[]

export type ModalProps = {
  onHide?: () => unknown
  show?: boolean
}

export type OwnModalProps<T extends ModalProps> = Omit<T, keyof ModalProps>

export type Open = {
  <P extends ModalProps>(modal: ComponentType<P>, props: OwnModalProps<P>): void
  <P extends ModalProps>(modal: ComponentType<Exact<P, ModalProps>>): void
}

export type Close = <P extends ModalProps>(modal: ComponentType<P>) => void

export type ModalContextValue = {
  open: Open
  close: Close
  modals: Modals
}
