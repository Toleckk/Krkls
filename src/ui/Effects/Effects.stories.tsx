import {Meta, Story} from '@storybook/react/types-6-0'
import {Effects, EffectsProps} from './Effects'

export default {
  component: Effects,
  title: 'Effects',
} as Meta

export const Usual: Story<EffectsProps> = props => <Effects {...props} />
