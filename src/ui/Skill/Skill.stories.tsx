import {Meta, Story} from '@storybook/react/types-6-0'
import {Skill, SkillProps} from './Skill'

export default {
  component: Skill,
  title: 'Skill',
} as Meta

export const Usual: Story<SkillProps> = props => <Skill {...props} />
