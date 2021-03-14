import {useCallback} from 'react'
import {useLocation} from 'react-router'
import {useClipboard} from 'use-clipboard-copy'
import {useAlert} from '../useAlert'

export const useCopyLink = () => {
  const location = useLocation()
  const {open} = useAlert()

  const {copy} = useClipboard({
    onSuccess: () => open({text: 'Ссылка скопирована в буфер обмена!'}),
  })

  return useCallback(() => {
    const shareData = {
      title: 'Krkls',
      url: window.location.origin + location.pathname,
    }

    if (navigator && 'share' in navigator && navigator.canShare?.(shareData)) {
      navigator.share(shareData)
    } else {
      copy(shareData.url)
    }
  }, [copy, location.pathname])
}
