import React, {useCallback} from 'react'
import {useAction, useAppSelector} from '../../store'
import {selectDevices, selectSortedShips, selectWeapons} from '../../store/items'
import {ItemsPanel} from '../ItemsPanel'
import {actions} from '../../store/highlight'
import {useModal} from '../../contexts/ModalContext'
import s from './Items.module.scss'

export const Items = () => {
  const devices = useAppSelector(selectDevices)
  const weapons = useAppSelector(selectWeapons)
  const ships = useAppSelector(selectSortedShips)

  const highlightItem = useAction(item => actions.highlightItem({item}))
  const resetHighlight = useAction(() => actions.reset())

  const {open: openModal, isOpened} = useModal<string>('item')

  const open = useCallback(item => openModal(item.name), [openModal])

  return (
    <div>
      <div className={s.items}>
        <div className={s.column}>
          <ItemsPanel
            title="Устройства"
            items={devices}
            onClick={open}
            onMouseEnter={highlightItem}
            onMouseLeave={() => !isOpened && resetHighlight()}
          />
        </div>
        <div className={s.column}>
          <ItemsPanel
            title="Оружие"
            items={weapons}
            onClick={open}
            onMouseEnter={highlightItem}
            onMouseLeave={() => !isOpened && resetHighlight()}
          />
        </div>
      </div>
      <div className={s.column}>
        <ItemsPanel
          title="Корабли"
          items={ships}
          onClick={open}
          onMouseEnter={highlightItem}
          onMouseLeave={() => !isOpened && resetHighlight()}
        />
      </div>
    </div>
  )
}
