import React from 'react'
import {Meta, Story} from '@storybook/react/types-6-0'
import {Icon} from '../Icon'
import {Button, ButtonProps} from './Button'

export default {
  component: Button,
  title: 'Button',
  argTypes: {
    onClick: {
      table: {
        disable: true,
      },
    },
  },
} as Meta

export const Usual: Story<ButtonProps> = props => (
  <div>
    <Button {...props}>5</Button>
    <Button {...props} style={{marginLeft: '1rem'}}>
      <Icon icon="reset" />
    </Button>
  </div>
)
