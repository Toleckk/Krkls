import React, {useMemo} from 'react'
import classNames from 'classnames'
import {useSkillsContext} from '../services/skills'
import {getExperience, short} from '../services/lvl'
import styles from './Lvl.module.scss'
import {useHighlightContext} from '../services/highlight'

export const Lvl = () => {
  const {sum, skills} = useSkillsContext()
  const {highlightedSkills} = useHighlightContext()

  const requiredLvl = useMemo(
    () =>
      skills
        .filter(skill => highlightedSkills[skill.name])
        .map(({count, name}) =>
          highlightedSkills[name] > count ? highlightedSkills[name] - count : 0,
        )
        .reduce((acc, cur) => acc + cur, 0) || 1,
    [skills, highlightedSkills],
  )

  const exp = getExperience(sum)
  const requiredExp = getExperience(requiredLvl + sum)

  const style = useMemo(() => ({minWidth: (exp / requiredExp) * 100 + '%'}), [exp, requiredExp])

  return (
    <div className={styles.column}>
      <div className={styles.row}>
        <div>
          <span className={styles.lvl}>{sum}</span>
          <span className={styles.exp}>{short(exp)}</span>
        </div>
        <div>
          <span className={styles.exp}>{short(requiredExp)}</span>
          <span className={classNames(styles.lvl, styles.required)}>{requiredLvl + sum}</span>
        </div>
      </div>
      <div className={styles.progress}>
        <div className={styles.has} style={style} />
      </div>
    </div>
  )
}
