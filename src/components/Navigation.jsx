import React, {useCallback, useState} from 'react'
import classNames from 'classnames'
import styles from './Navigation.module.scss'
import {Icon} from '../ui/Icon'
import {useHistory, useLocation} from 'react-router'
import {useCanGo} from '../services/history'
import {useSkillsContext} from '../services/skills'
import {useClipboard} from 'use-clipboard-copy'


const copyParams = {
    onSuccess: () => alert('Ссылка скопирована в буфер обмена!')
}


export const Navigation = () => {
    const [hidden, setHidden] = useState(true)
    const hide = () => setHidden(true)
    const show = () => setHidden(false)

    const {canGoForward, canGoBack} = useCanGo()

    const history = useHistory()
    const goBack = () => history.goBack()
    const goForward = () => history.goForward()

    const {copy} = useClipboard(copyParams)
    const location = useLocation()

    const onCopyClick = useCallback(() => copy(window.location.origin + location.pathname), [copy, location.pathname])

    const {reset} = useSkillsContext()

    return (
        <div className={classNames(styles.fixed, hidden && styles.hidden)}>
            <button className={styles.button} onClick={goBack} disabled={!canGoBack}>
                <Icon icon="undo" className={classNames(styles.icon, !canGoBack && styles.disabled)}/>
            </button>
            <button className={styles.button} onClick={goForward} disabled={!canGoForward}>
                <Icon icon="redo" className={classNames(styles.icon, !canGoForward && styles.disabled)}/>
            </button>

            <div className={styles.main}>
                <div className={styles.container}>
                    <button onClick={hidden ? show : onCopyClick}
                            className={classNames(styles.round, hidden && styles.hidden)}>
                        <Icon icon="show" className={classNames(styles.show, !hidden && styles.hidden)}/>
                        <Icon icon="copy" className={styles.copy}/>
                    </button>
                </div>
            </div>

            <button className={styles.button} onClick={reset}>
                <Icon icon="reset" className={styles.icon}/>
            </button>
            <button className={styles.button} onClick={hide}>
                <Icon icon="hide" className={styles.icon}/>
            </button>
        </div>
    )
}