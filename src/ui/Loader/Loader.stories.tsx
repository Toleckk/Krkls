import {Meta, Story} from '@storybook/react/types-6-0'
import {Loader, LoaderProps} from './Loader'

export default {
  component: Loader,
  title: 'Loader',
} as Meta

export const Usual: Story<LoaderProps> = props => <Loader {...props} />
