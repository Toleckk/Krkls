import {Meta, Story} from '@storybook/react/types-6-0'
import {ItemsPanel, ItemsPanelProps} from './ItemsPanel'

export default {
  component: ItemsPanel,
  title: 'ItemsPanel',
} as Meta

export const Usual: Story<ItemsPanelProps> = props => <ItemsPanel {...props} />
