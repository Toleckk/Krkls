import React, {useCallback} from 'react'
import {ControlButton} from './ControlButton'
import {useCanGo} from '../services/history'
import {useHistory} from 'react-router'

export const Redo = () => {
    const {canGoForward} = useCanGo()
    const history = useHistory()
    const onClick = useCallback(() => history.goForward(), [history])

    return <ControlButton icon="redo" disabled={!canGoForward} onClick={onClick} title="Вперёд"/>
}