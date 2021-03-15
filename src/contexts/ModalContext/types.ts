export type Modal = {
  name: string
  props?: Record<string, unknown>
}

export type Modals = Modal[]

export type ModalProps = {
  onHide?: () => unknown
  show?: boolean
}

export type OwnModalProps<T extends ModalProps> = Omit<T, keyof ModalProps>

export type Open = {
  <P extends ModalProps>(name: string, props: OwnModalProps<P>): void
  (name: string): void
}

export type Close = (name: string) => void

export type ModalContextValue = {
  open: Open
  close: Close
  modals: Modals
}
