import React, {useCallback, useEffect} from 'react'
import {useMedia} from 'use-media'
import {Drawer} from '../../ui/Drawer'
import {useModal} from '../../contexts/ModalContext'
import {ItemCard} from '../../components/ItemCard'
import {Icon} from '../../ui/Icon'
import {ItemSkills} from '../../components/ItemSkills'
import {useAction, useAppSelector} from '../../store'
import {actions} from '../../store/skills'
import {selectItemByName} from './selectors'
import s from './ItemDrawer.module.scss'
import {Divider} from '../../ui/Divider'
import {actions as highlightActions} from '../../store/highlight'

export type ItemDrawerProps = {
  name?: string
  show?: boolean
  onHide?: () => unknown
}

export const ItemDrawer: React.FC<ItemDrawerProps> = React.memo(({name, show, onHide}) => {
  const {props, isOpened, close} = useModal(ItemDrawer)

  const item = useAppSelector(selectItemByName(name || props?.name))
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
      highlightItem({item})
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
