import React, {useCallback} from 'react'
import {Items} from '@krkls/components/Items'
import {useAction, useAppSelector} from '@krkls/store'
import {actions} from '@krkls/store/highlight'
import {useModal} from '@krkls/contexts/ModalContext'
import {Item} from '@krkls/store/items'
import {selectSortedItems} from './selectors'

export const ItemsContainer: React.FC = () => {
  const {devices, ships, weapons} = useAppSelector(selectSortedItems)

  const {open, isOpened} = useModal<string>('item')
  const openModal = useCallback((item: Item) => open(item.name), [open])

  const highlightItem = useAction((item: Item) => actions.highlightItem({item: item.name}))

  const reset = useAction(actions.reset)
  const resetHighlight = useCallback(() => {
    if (!isOpened) {
      return reset()
    }
  }, [isOpened, reset])

  return (
    <Items
      devices={devices}
      weapons={weapons}
      ships={ships}
      onItemClick={openModal}
      onHighlight={highlightItem}
      onHighlightReset={resetHighlight}
    />
  )
}
