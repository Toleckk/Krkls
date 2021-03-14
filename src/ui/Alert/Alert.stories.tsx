import {Meta, Story} from '@storybook/react/types-6-0'
import {Alert, AlertProps} from './Alert'

export default {
  component: Alert,
  title: 'Alert',
  argTypes: {onHide: {table: {disable: true}}},
  args: {
    text: 'This is my awesome alert',
  },
} as Meta

export const Usual: Story<AlertProps> = props => <Alert {...props} />
