import React, {useCallback} from 'react'
import {ControlButton} from './ControlButton'
import {useCanGo} from '../services/history'
import {useHistory} from 'react-router'

export const Undo = () => {
    const {canGoBack} = useCanGo()
    const history = useHistory()
    const onClick = useCallback(() => history.goBack(), [history])

    return <ControlButton icon="undo" disabled={!canGoBack} onClick={onClick}/>
}