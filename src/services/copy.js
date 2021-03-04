import {useCallback} from 'react'
import {useLocation} from 'react-router'
import {useClipboard} from 'use-clipboard-copy'
import {useAlert} from './alert'

export const useCopyLink = () => {
  const location = useLocation()
  const {open} = useAlert()

  const {copy} = useClipboard({onSuccess: () => open('Ссылка скопирована в буфер обмена!')})

  return useCallback(() => {
    const url = window.location.origin + location.pathname
    if (
      navigator &&
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({url, title: 'Krkls'})
    )
      navigator.share({url, title: 'Krkls'})
    else copy(url)
  }, [copy, location.pathname])
}
