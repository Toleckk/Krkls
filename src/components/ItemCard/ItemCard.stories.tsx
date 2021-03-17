import React from 'react'
import {Meta, Story} from '@storybook/react/types-6-0'
import {devices} from '../../data/images'
import {Device} from '../../store/items'
import {ItemCard, ItemCardProps} from './ItemCard'

export default {
  component: ItemCard,
  title: 'ItemCard',
  argTypes: {item: {table: {disable: true}}},
  parameters: {
    layout: 'centered',
  },
} as Meta

const item: Device = {
  type: 'Устройства',
  name: 'Device',
  skills: {
    Skill1: 5,
    Skill2: 10,
  },
  info: {
    Quality: 'Legendary',
    'In action': 'Useless',
    'Cool down': '40s',
    'Energy cost': '40',
  },
  effects: [
    'Does {|this|} during {|50 seconds|}',
    'Does {|that|} with {|this|} during {|1 minute|}',
    "Doesn't do {|that|} if use with {|this|}",
  ],
  bigImage: devices.img_1_Main_reflector65,
  image: devices.img_1_Main_reflector,
}

export const Usual: Story<ItemCardProps> = props => <ItemCard {...props} item={item} />
