import {useAlert} from './alert'
import {useCallback, useMemo} from 'react'
import {useLocation} from 'react-router'
import {useClipboard} from 'use-clipboard-copy'

export const useCopyLink = () => {
    const location = useLocation()
    const {open} = useAlert()

    const copyParams = useMemo(() => ({onSuccess: () => open('Ссылка скопирована в буфер обмена!')}), [open])

    const {copy} = useClipboard(copyParams)

    return useCallback(() => {
        const url = window.location.origin + location.pathname
        if(navigator && navigator.share)
            navigator.share({url, title: 'Krkls'})
        else
            copy(url)
        }, [copy, location.pathname],
    )
}