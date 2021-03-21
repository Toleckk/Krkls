import React from 'react'
import {Meta, Story} from '@storybook/react/types-6-0'
import {Icon, IconProps} from './Icon'

export default {
  component: Icon,
  title: 'Icon',
  argTypes: {
    fill: {
      control: {
        type: 'color',
      },
    },
  },
  args: {
    icon: 'reset',
    fill: '#000000',
  },
  parameters: {
    layout: 'centered',
  },
} as Meta

export const Usual: Story<IconProps> = props => (
  <div style={{width: 100}}>
    <Icon {...props} />
  </div>
)
