import React, {Fragment} from 'react'
import {useMedia} from 'use-media'
import {Skill} from '../../ui/Skill'
import {Skill as TSkill} from '../../store/skills'
import {Divider} from '../../ui/Divider'
import s from './Skills.module.scss'

export type SkillsProps = {
  skills: TSkill[][]
  onIncrement?: (skill: TSkill) => unknown
  onDecrement?: (skill: TSkill) => unknown
  onHighlight?: (skill: TSkill) => unknown
  onResetHighlight?: () => unknown
}

export const Skills: React.FC<SkillsProps> = ({
  skills,
  onHighlight,
  onResetHighlight,
  onDecrement,
  onIncrement,
}) => {
  const isTablet = useMedia({minWidth: 768})

  return (
    <div className={s.skills}>
      {skills.map((group, i, {length}) => (
        <Fragment key={i}>
          <ul className={s.column}>
            {group.map((skill, j) => (
              <li key={'' + i + j}>
                <Skill
                  skill={skill}
                  onIncrement={onIncrement}
                  onDecrement={onDecrement}
                  onMouseEnter={onHighlight}
                  onMouseLeave={onResetHighlight}
                />
              </li>
            ))}
          </ul>
          {i < length - 1 && (
            <div className={s.column}>
              <Divider className={s.divider} vertical={isTablet} />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  )
}
