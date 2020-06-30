import React from 'react'
import {useSkillsContext} from '../services/skills'
import {useHighlight} from '../services/highlight'

export const Skill = ({skill}) => {
    const {incrementSkill, decrementSkill} = useSkillsContext()
    const {highlightItems, resetItemsHighlight} = useHighlight()
    const {required, count, max, name} = skill

    const onMouseEnter = () => highlightItems(skill)

    return (
        <tr onMouseEnter={onMouseEnter} onMouseLeave={resetItemsHighlight}>
            <td style={{color: required ? 'green' : 'white'}}>{name}</td>
            <td>{count}</td>
            <td>{required && (required.count > skill.count) && ('+' + (required.count - skill.count))}</td>
            <td>
                <button
                    disabled={count >= max}
                    onClick={() => incrementSkill(name)}
                >
                    +
                </button>
            </td>
            <td>
                <button
                    disabled={count <= 0}
                    onClick={() => decrementSkill(name)}
                >
                    -
                </button>
            </td>
        </tr>
    )
}