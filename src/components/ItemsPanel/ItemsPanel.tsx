import React from 'react'
import type {Available, Item as TItem, WithHighlight} from '../../store/items'
import {Panel} from '../../ui/Panel'
import {Item} from '../../ui/Item'
import s from './ItemsPanel.module.scss'

export type FullItem = WithHighlight<Available<TItem>>

export type ItemsPanelProps = {
  title: string
  items: Array<FullItem | FullItem[]>
  onClick?: (item: FullItem) => unknown
  onMouseEnter?: (item: FullItem) => unknown
  onMouseLeave?: (item: FullItem) => unknown
}

export const ItemsPanel: React.FC<ItemsPanelProps> = ({title, items, ...props}) => (
  <Panel title={title}>
    <ul className={s.flex}>
      {items.map((item, i) =>
        Array.isArray(item) ? (
          <li key={item[0]?.name || i}>
            <ul className={s.flex}>
              {item.map(item => (
                <li className={s.item} key={item.name}>
                  <Item key={item.name} item={item} {...props} />
                </li>
              ))}
            </ul>
          </li>
        ) : (
          <li key={item.name} className={s.item}>
            <Item key={item.name} item={item} {...props} />
          </li>
        ),
      )}
    </ul>
  </Panel>
)
