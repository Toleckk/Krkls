import React from 'react'
import {Meta, Story} from '@storybook/react/types-6-0'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {newHistory} from 'redux-undo'
import {devices} from '../../data/images'
import {ItemDrawer, ItemDrawerProps} from './ItemDrawer'

export default {
  component: ItemDrawer,
  title: 'ItemDrawer',
  argTypes: {
    itemName: {table: {disable: true}},
    onHide: {table: {disable: true}},
  },
  args: {
    show: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta

export const Usual: Story<ItemDrawerProps> = props => (
  <Provider store={store}>
    <ItemDrawer name="Устройство" {...props} />
  </Provider>
)

const store = configureStore()({
  items: [
    {
      name: 'Устройство',
      skills: {
        Skill1: 5,
        Skill2: 3,
        Skill3: 10,
      },
      type: 'Устройства',
      bigImage: devices.img_1_Main_reflector65,
      image: devices.img_1_Main_reflector,
      info: {
        Размер: 50,
        Перезарядка: '57.0 сек.',
        Размещение: 'Устройства',
        'Затрата энергии': 55,
      },
      effects: [
        'Защищает от эффектов на {|25 сек|}',
        'Сжигает энергию цели',
        'Защищает от ракетных атак с вероятностью {|70%|} на {|20 сек|}',
      ],
    },
  ],
  skills: newHistory(
    [],
    [
      {
        name: 'Skill1',
        count: 10,
      },
      {
        name: 'Skill2',
        count: 0,
      },
      {
        name: 'Skill3',
        count: 3,
      },
    ],
    [],
  ),
})
