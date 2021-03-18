import React from 'react'
import {Meta, Story} from '@storybook/react/types-6-0'
import {Divider, DividerProps} from './Divider'

export default {
  component: Divider,
  title: 'Divider',
  parameters: {
    layout: 'centered',
  },
} as Meta

export const Usual: Story<DividerProps> = props => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 100,
      height: 100,
    }}
  >
    <Divider {...props} />
  </div>
)
