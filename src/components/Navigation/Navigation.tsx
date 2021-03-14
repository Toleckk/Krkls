import React from 'react'
import classNames from 'classnames'
import {ActionCreators} from 'redux-undo'
import {useBooleanState} from 'use-boolean-state'
import {Icon} from '../../ui/Icon'
import {useCopyLink} from '../../services/copy'
import {actions as skillsActions} from '../../store/skills'
import {useAction, useAppSelector} from '../../store'
import styles from './Navigation.module.scss'

export const Navigation = () => {
  const undo = useAction(ActionCreators.undo)
  const redo = useAction(ActionCreators.redo)
  const {canUndo, canRedo} = useAppSelector(state => ({
    canUndo: !!state.skills.past.length,
    canRedo: !!state.skills.future.length,
  }))
  const reset = useAction(skillsActions.reset)

  const [hidden, hide, show] = useBooleanState(true)

  const copy = useCopyLink()

  return (
    <div className={classNames(styles.fixed, hidden && styles.hidden)}>
      <button className={styles.button} onClick={undo} disabled={!canUndo}>
        <Icon icon="undo" className={classNames(styles.icon, !canUndo && styles.disabled)} />
      </button>
      <button className={styles.button} onClick={redo} disabled={!canRedo}>
        <Icon icon="redo" className={classNames(styles.icon, !canRedo && styles.disabled)} />
      </button>

      <div className={styles.main}>
        <div className={styles.container}>
          <button
            onClick={hidden ? show : copy}
            className={classNames(styles.round, hidden && styles.hidden)}
          >
            <Icon icon="show" className={classNames(styles.show, !hidden && styles.hidden)} />
            <Icon icon="copy" className={styles.copy} />
          </button>
        </div>
      </div>

      <button className={styles.button} onClick={reset}>
        <Icon icon="reset" className={styles.icon} />
      </button>
      <button className={styles.button} onClick={hide}>
        <Icon icon="hide" className={styles.icon} />
      </button>
    </div>
  )
}
