import React, {useCallback, useMemo, useState} from 'react'
import c from 'classnames'
import styles from './ItemCard.module.scss'
import {ItemSkill} from './ItemSkill'
import {Effects} from './Effects'
import {useDrawer} from '../services/drawer'
import {useAction, useAppSelector} from '../store'
import {selectSkills, actions as skillsActions} from '../store/skills'

export const ItemCard = ({item}) => {
  const addSkills = useAction(skillsActions.add)

  const skills = useAppSelector(selectSkills)
  const findSkill = useCallback(name => skills.find(skill => skill.name === name), [skills])

  const {close} = useDrawer()

  const requiredSkills = useMemo(() => {
    const required = Object.keys(item.skills)
    return required.map(key => ({
      ...findSkill(key),
      count: Math.max(findSkill(key).count, +item.skills[findSkill(key).name]),
    }))
  }, [item, findSkill])

  const [selectedSkills, setSelectedSkills] = useState(requiredSkills)
  const addSkill = useCallback(
    (name, count) => {
      if (selectedSkills === requiredSkills) return setSelectedSkills([{name, count}])

      const newSkills = [...selectedSkills.filter(skill => skill.name !== name), {name, count}]

      if (!newSkills.reduce((acc, b) => acc + b.count, 0)) return setSelectedSkills(requiredSkills)

      setSelectedSkills(newSkills)
    },
    [setSelectedSkills, selectedSkills, requiredSkills],
  )

  const count =
    selectedSkills.reduce((acc, s) => {
      const {count} = findSkill(s.name)
      return acc + Math.max(s.count - count, 0)
    }, 0) || null

  const commit = () => {
    close()
    addSkills({skills: selectedSkills})
  }

  return (
    <div className={styles.modal}>
      <div className={styles.title}>
        <div className={styles.image}>
          <img src={item.bigImage || item.image} alt={item.name} />
        </div>
        <span className={styles.name}>{item.name}</span>
      </div>
      <span className={styles.divider} />
      <div className={styles.info}>
        <div className={styles.scrollable}>
          {item.info ? (
            <>
              <table>
                <tbody>
                  {Object.keys(item.info).map(key => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td style={{textAlign: 'end'}}>{item.info[key]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Effects item={item} />
            </>
          ) : (
            <span style={{textAlign: 'center'}}>Информации пока нет!</span>
          )}
        </div>
        <span className={c(styles.divider, styles.adaptive)} />
        <div className={styles.skills}>
          <table className={styles.table}>
            <tbody>
              {Object.keys(item.skills)
                .map(key => ({name: key, count: item.skills[key]}))
                .map(skill => (
                  <ItemSkill skill={skill} key={skill.name} setSkill={addSkill} />
                ))}
            </tbody>
          </table>
          {count && (
            <button className={styles.apply} onClick={commit} title="Добавить">
              <span className={styles.count}>+{count}</span>
            </button>
          )}
        </div>
      </div>
      <span className={c(styles.divider, styles.mobile)} />
    </div>
  )
}
