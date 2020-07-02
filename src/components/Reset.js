import React from 'react'
import {useSkillsContext} from '../services/skills'
import {ControlButton} from './ControlButton'

export const Reset = () => {
    const {reset} = useSkillsContext()
    return <ControlButton onClick={reset} icon="reset" title="Сбросить"/>
}