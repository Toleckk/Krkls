import {Meta, Story} from '@storybook/react/types-6-0'
import {Item, ItemProps} from './Item'

export default {
  component: Item,
  title: 'Item',
} as Meta

export const Usual: Story<ItemProps> = props => <Item {...props} />
