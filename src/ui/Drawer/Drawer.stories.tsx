import React from 'react'
import {Meta, Story} from '@storybook/react/types-6-0'
import {Drawer, DrawerProps} from './Drawer'

export default {
  component: Drawer,
  title: 'Drawer',
  argTypes: {
    placement: {
      control: {
        type: 'inline-radio',
        options: ['left', 'right', 'bottom', 'top'],
      },
    },
    onHide: {table: {disable: true}},
    zIndex: {table: {disable: true}},
  },
} as Meta

export const Usual: Story<DrawerProps> = props => (
  <Drawer {...props}>
    <div style={{width: 200, height: 200, background: 'red'}}>Content</div>
  </Drawer>
)
