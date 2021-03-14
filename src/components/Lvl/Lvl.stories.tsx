import {Meta, Story} from '@storybook/react/types-6-0'
import {Lvl, LvlProps} from './Lvl'

export default {
  component: Lvl,
  title: 'Lvl',
  args: {
    currentLvl: 1,
    currentExp: 1,
    requiredLvl: 5,
    requiredExp: 5,
  },
  parameters: {
    layout: 'centered',
  },
} as Meta

export const Usual: Story<LvlProps> = props => <Lvl {...props} />
