import React from 'react'
import {Meta, Story} from '@storybook/react/types-6-0'
import {ItemSkills, ItemSkillsProps} from './ItemSkills'

export default {
  component: ItemSkills,
  title: 'ItemSkills',
  parameters: {
    layout: 'centered',
  },
} as Meta

const skills = [
  {
    name: 'skill1',
    required: 10,
    count: 5,
  },
  {
    name: 'skill2',
    required: 10,
    count: 5,
  },
  {
    name: 'skill3',
    required: 10,
    count: 5,
  },
]

export const Usual: Story<ItemSkillsProps> = props => <ItemSkills {...props} skills={skills} />
