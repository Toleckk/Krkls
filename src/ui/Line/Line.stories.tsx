import {Meta, Story} from '@storybook/react/types-6-0'
import {Line, LineProps} from './Line'

export default {
  component: Line,
  title: 'Line',
  argTypes: {
    value: {
      control: {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.1,
      },
    },
  },
  args: {
    value: 0.5,
  },
} as Meta

export const Usual: Story<LineProps> = props => <Line {...props} />
