import React, {useCallback} from 'react'
import {Meta, Story} from '@storybook/react/types-6-0'
import {ModalProvider} from '@krkls/contexts/ModalContext'
import {useAlert} from '@krkls/hooks/useAlert'
import {TextAlert, TextAlertProps} from './TextAlert'

export default {
  component: TextAlert,
  title: 'TextAlert',
  argTypes: {
    onHide: {table: {disable: true}},
    id: {table: {disable: true}},
    show: {table: {disable: true}},
  },
  args: {
    text: 'This is my awesome alert',
    delay: 3000,
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <ModalProvider>
        <Story />
      </ModalProvider>
    ),
  ],
} as Meta

export const Usual: Story<TextAlertProps> = ({text, delay}) => {
  const {open} = useAlert()

  const openNew = useCallback(() => open({text, delay}), [open, text, delay])

  return (
    <>
      <TextAlert />
      <button onClick={openNew}>Open new</button>
    </>
  )
}
