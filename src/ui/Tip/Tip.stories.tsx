import {Meta, Story} from '@storybook/react/types-6-0'
import {Tip, TipProps} from './Tip'

export default {
  component: Tip,
  title: 'Tip',
  argTypes: {
    children: {control: {type: 'text'}},
  },
  args: {
    children: 'This is my tip text',
  },
  parameters: {
    layout: 'centered',
  },
} as Meta

export const Usual: Story<TipProps> = props => <Tip {...props} />
