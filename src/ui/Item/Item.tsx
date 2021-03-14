import React, {useCallback} from 'react'
import c from 'classnames'
import type {Available, Item as TItem, WithHighlight} from '../../store/items'
import {Button} from '../Button'
import s from './Item.module.scss'

export type ItemProps = {
  item: WithHighlight<Available<TItem>>
  onClick?: (item: WithHighlight<Available<TItem>>) => unknown
  onMouseEnter?: (item: WithHighlight<Available<TItem>>) => unknown
  onMouseLeave?: (item: WithHighlight<Available<TItem>>) => unknown
}

export const Item: React.FC<ItemProps> = React.memo(
  ({item, onClick, onMouseEnter, onMouseLeave}) => {
    const handleClick = useCallback(() => onClick?.(item), [item, onClick])
    const handleMouseEnter = useCallback(() => onMouseEnter?.(item), [item, onMouseEnter])
    const handleMouseLeave = useCallback(() => onMouseLeave?.(item), [item, onMouseLeave])

    return (
      <Button
        size="lg"
        available={item.available}
        className={c(s.item, {[s.highlighted]: !!item.highlight})}
        title={item.name}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img className={s.image} src={item.image} alt={item.name} />
        {!!item.highlight && (
          <span className={c(s.highlight, item.highlight.available && s.available)}>
            {item.highlight.value}
          </span>
        )}
      </Button>
    )
  },
)
