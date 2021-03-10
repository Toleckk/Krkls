import {Meta, Story} from '@storybook/react/types-6-0'
import {Panel} from './Panel'

export default {
  component: Panel,
  title: 'Panel',
  parameters: {
    layout: 'centered',
  },
} as Meta

export const Full: Story<{title: string; body: string}> = ({title, body}) => (
  <div style={{width: 500, height: 150}}>
    <Panel title={title}>{body}</Panel>
  </div>
)
Full.args = {
  title: 'Title',
  body: 'Body',
}
Full.argTypes = {
  title: {
    control: {
      type: 'text',
    },
  },
  body: {
    control: {
      type: 'text',
    },
  },
}

export const WithoutTitle: Story<{body: string}> = ({body}) => (
  <div style={{width: 500, height: 150}}>
    <Panel>{body}</Panel>
  </div>
)
WithoutTitle.args = {
  body: 'Body',
}
WithoutTitle.argTypes = {
  body: {
    control: {
      type: 'text',
    },
  },
}
