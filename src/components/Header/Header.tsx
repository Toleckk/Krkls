import React from 'react'
import {Lvl} from '../Lvl'
import {ControlButton} from '../../ui/ControlButton'
import s from './Header.module.scss'

export type HeaderProps = {
  onUndo?: () => void
  isUndoDisabled?: boolean
  onRedo?: () => void
  isRedoDisabled?: boolean
  onReset?: () => void
  onCopy?: () => void
  lvl: {
    exp: number
    lvl: number
  }
  requiredLvl: {
    exp: number
    lvl: number
  }
}

export const Header: React.FC<HeaderProps> = ({
  isRedoDisabled = false,
  isUndoDisabled = false,
  onRedo,
  onUndo,
  onReset,
  lvl,
  requiredLvl,
  onCopy,
}) => (
  <header className={s.header}>
    <Lvl
      currentExp={lvl.exp}
      currentLvl={lvl.lvl}
      requiredExp={requiredLvl.exp}
      requiredLvl={requiredLvl.lvl}
    />
    <div className={s.control}>
      <ControlButton icon="copy" title="Копировать ссылку" onClick={onCopy} />
      <ControlButton icon="undo" disabled={isUndoDisabled} onClick={onUndo} title="Назад" />
      <ControlButton onClick={onReset} icon="reset" title="Сбросить" />
      <ControlButton icon="redo" disabled={isRedoDisabled} onClick={onRedo} title="Вперёд" />
    </div>
  </header>
)
