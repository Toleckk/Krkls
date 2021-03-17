import React, {useCallback} from 'react'
import {selectSortedItems} from './selectors'
import {Items} from '../../components/Items'
import {useAction, useAppSelector} from '../../store'
import {actions} from '../../store/highlight'
import {useModal} from '../../contexts/ModalContext'
import {Item} from '../../store/items'

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
