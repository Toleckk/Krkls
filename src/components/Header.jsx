import React, {useCallback} from 'react'
import {Lvl} from './Lvl'
import styles from './Header.module.css'
import {useCanGo} from '../services/history'
import {ControlButton} from './ControlButton'
import {useHistory} from 'react-router'
import {useSkillsContext} from '../services/skills'

export const Header = () => {
    const {canGoBack, canGoForward} = useCanGo()
    const history = useHistory()

    const {reset} = useSkillsContext()
    const onUndo = useCallback(() => history.goBack(), [history])
    const onRedo = useCallback(() => history.goForward(), [history])

    return (
        <header className={styles.header}>
            <Lvl/>
            <div className={styles.control}>
                <ControlButton icon="undo" disabled={!canGoBack} onClick={onUndo} title="Назад"/>
                <ControlButton onClick={reset} icon="reset" title="Сбросить"/>
                <ControlButton icon="redo" disabled={!canGoForward} onClick={onRedo} title="Вперёд"/>
            </div>
        </header>
    )
}