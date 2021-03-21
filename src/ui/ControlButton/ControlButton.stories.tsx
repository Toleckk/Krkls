import React from 'react'
import {Meta, Story} from '@storybook/react/types-6-0'
import {ControlButton, ControlButtonProps} from './ControlButton'

export default {
  component: ControlButton,
  title: 'ControlButton',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClick: {
      table: {
        disable: true,
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    available: true,
    icon: 'reset',
    disabled: false,
    size: 'md',
  },
} as Meta

export const Usual: Story<ControlButtonProps> = props => <ControlButton {...props} />
