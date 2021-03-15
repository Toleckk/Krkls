import React from 'react'
import {ModalProps, useModal} from '../../contexts/ModalContext'
import {Alert} from '../../ui/Alert'
import {Tip} from '../../ui/Tip'

export type TextAlertProps = ModalProps & {
  id?: string
  text?: string
  delay?: number
}

export const TextAlert: React.FC<TextAlertProps> = ({text, id, delay, onHide, show}) => {
  const {props, isOpened, close} = useModal<TextAlertProps>('text alert')

  if (!show && !isOpened) {
    return null
  }

  return (
    <Alert key={id || props?.id} delay={delay ?? props?.delay} onHide={onHide || close}>
      <Tip>{text || props?.text}</Tip>
    </Alert>
  )
}
