import React, {useCallback, useEffect} from 'react'
import {useMedia} from 'use-media'
import {Drawer, Icon, Divider} from '@krkls/ui'
import {ItemCard, ItemSkills} from '@krkls/components'
import {useAction, useAppSelector} from '@krkls/store'
import {actions} from '@krkls/store/skills'
import {actions as highlightActions} from '@krkls/store/highlight'
import {useModal} from '@krkls/contexts/ModalContext'
import {selectItemByName} from './selectors'
import s from './ItemDrawer.module.scss'

export type ItemDrawerProps = {
  name?: string
  show?: boolean
  onHide?: () => unknown
}

export const ItemDrawer: React.FC<ItemDrawerProps> = React.memo(({name, show, onHide}) => {
  const {props, isOpened, close} = useModal<string>('item')

  const item = useAppSelector(selectItemByName(name || props))
  const addSkills = useAction(actions.add)

  const handleAddClick = useCallback(
    skills => {
      addSkills({skills})
      close()
    },
    [addSkills, close],
  )

  const highlightItem = useAction(highlightActions.highlightItem)
  const resetHighlight = useAction(highlightActions.reset)

  useEffect(() => {
    if (item && (show || isOpened)) {
      highlightItem({item: item.name})
    } else {
      resetHighlight()
    }
  }, [show, isOpened, highlightItem, item, resetHighlight])

  const isWide = useMedia({minWidth: 1280})

  return (
    <Drawer
      show={show ?? isOpened}
      onHide={onHide || close}
      placement={isWide ? 'right' : 'bottom'}
    >
      <div className={s.container}>
        {!!item && (
          <>
            <ItemCard item={item} key={item.name} className={s.card} />
            <Divider color="secondary" />
            <ItemSkills skills={item.skillMap} onAddClick={handleAddClick} />
            {!isWide && <Divider color="secondary" />}
          </>
        )}
        {!isWide && (
          <button className={s.close} onClick={onHide || close}>
            <Icon icon="hide" className={s.icon} />
          </button>
        )}
      </div>
    </Drawer>
  )
})
