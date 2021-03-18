import React from 'react'
import {Meta, Story} from '@storybook/react/types-6-0'
import {Header, HeaderProps} from './Header'

export default {
  title: 'Header',
  component: Header,
  argTypes: {
    isRedoDisabled: {defaultValue: false},
    isUndoDisabled: {defaultValue: false},
    onRedo: {table: {disable: true}},
    onUndo: {table: {disable: true}},
    onReset: {table: {disable: true}},
    onCopy: {table: {disable: true}},
    currentLvl: {defaultValue: {lvl: 1, exp: 1}},
    requiredLvl: {defaultValue: {lvl: 5, exp: 5}},
  },
} as Meta

export const Usual: Story<HeaderProps> = props => <Header {...props} />
