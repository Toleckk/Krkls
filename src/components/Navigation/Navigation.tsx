import React from 'react'
import classNames from 'classnames'
import {useBooleanState} from 'use-boolean-state'
import {Icon} from '../../ui/Icon'
import styles from './Navigation.module.scss'

export type NavigationProps = {
  onUndo?: () => void
  isUndoDisabled?: boolean
  onRedo?: () => void
  isRedoDisabled?: boolean
  onReset?: () => void
  onCopy?: () => void
}

export const Navigation: React.FC<NavigationProps> = ({
  onUndo,
  isUndoDisabled,
  onRedo,
  isRedoDisabled,
  onReset,
  onCopy,
}) => {
  const [hidden, hide, show] = useBooleanState(true)

  return (
    <div className={classNames(styles.fixed, hidden && styles.hidden)}>
      <button className={styles.button} onClick={onUndo} disabled={isUndoDisabled}>
        <Icon icon="undo" className={classNames(styles.icon, isUndoDisabled && styles.disabled)} />
      </button>
      <button className={styles.button} onClick={onRedo} disabled={isRedoDisabled}>
        <Icon icon="redo" className={classNames(styles.icon, isRedoDisabled && styles.disabled)} />
      </button>

      <div className={styles.main}>
        <div className={styles.container}>
          <button
            onClick={hidden ? show : onCopy}
            className={classNames(styles.round, hidden && styles.hidden)}
          >
            <Icon icon="show" className={classNames(styles.show, !hidden && styles.hidden)} />
            <Icon icon="copy" className={styles.copy} />
          </button>
        </div>
      </div>

      <button className={styles.button} onClick={onReset}>
        <Icon icon="reset" className={styles.icon} />
      </button>
      <button className={styles.button} onClick={hide}>
        <Icon icon="hide" className={styles.icon} />
      </button>
    </div>
  )
}
