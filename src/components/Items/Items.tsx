import React, {useCallback} from 'react'
import {useAction, useAppSelector} from '../../store'
import {selectDevices, selectSortedShips, selectWeapons} from '../../store/items'
import {ItemsPanel} from '../ItemsPanel'
import {useDrawer} from '../../services/drawer'
import {actions} from '../../store/highlight'
import s from './Items.module.scss'

export const Items = () => {
  const devices = useAppSelector(selectDevices)
  const weapons = useAppSelector(selectWeapons)
  const ships = useAppSelector(selectSortedShips)

  const highlightItem = useAction(item => actions.highlightItem({item}))
  const resetHighlight = useAction(() => actions.reset())

  const {setItem, open, opened} = useDrawer()
  const openDrawer = useCallback(
    item => {
      setItem(item)
      open()
    },
    [setItem, open],
  )

  return (
    <div>
      <div className={s.items}>
        <div className={s.column}>
          <ItemsPanel
            title="Устройства"
            items={devices}
            onClick={openDrawer}
            onMouseEnter={highlightItem}
            onMouseLeave={() => !opened && resetHighlight()}
          />
        </div>
        <div className={s.column}>
          <ItemsPanel
            title="Оружие"
            items={weapons}
            onClick={openDrawer}
            onMouseEnter={highlightItem}
            onMouseLeave={() => !opened && resetHighlight()}
          />
        </div>
      </div>
      <div className={s.column}>
        <ItemsPanel
          title="Корабли"
          items={ships}
          onClick={openDrawer}
          onMouseEnter={highlightItem}
          onMouseLeave={() => !opened && resetHighlight()}
        />
      </div>
    </div>
  )
}
