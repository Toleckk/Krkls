import React from 'react'
import {useSkillsContext} from '../services/skills'

export const Control = () => {
    const {reset} = useSkillsContext()
    return <button onClick={reset}>Сбросить</button>
}