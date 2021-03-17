import React from 'react'
import {ItemsPanel} from '../ItemsPanel'
import {Available, Device, Item, Ship, Weapon, WithHighlight} from '../../store/items'
import s from './Items.module.scss'

export type ItemsProps = {
  devices: WithHighlight<Available<Device>>[]
  weapons: WithHighlight<Available<Weapon>>[]
  ships: WithHighlight<Available<Ship>>[][]
  onItemClick?: (item: Item) => unknown
  onHighlight?: (item: Item) => unknown
  onHighlightReset?: () => unknown
}

export const Items: React.FC<ItemsProps> = ({
  devices,
  weapons,
  ships,
  onItemClick,
  onHighlight,
  onHighlightReset,
}) => (
  <div>
    <div className={s.items}>
      <div className={s.column}>
        <ItemsPanel
          title="Устройства"
          items={devices}
          onClick={onItemClick}
          onMouseEnter={onHighlight}
          onMouseLeave={onHighlightReset}
        />
      </div>
      <div className={s.column}>
        <ItemsPanel
          title="Оружие"
          items={weapons}
          onClick={onItemClick}
          onMouseEnter={onHighlight}
          onMouseLeave={onHighlightReset}
        />
      </div>
    </div>
    <div className={s.column}>
      <ItemsPanel
        title="Корабли"
        items={ships}
        onClick={onItemClick}
        onMouseEnter={onHighlight}
        onMouseLeave={onHighlightReset}
      />
    </div>
  </div>
)
