import React from 'react'
import classNames from 'classnames'
import {Button} from '../ui/Button'
import {Icon} from '../ui/Icon'
import styles from './ControlButton.module.scss'

export const ControlButton = ({icon, className, ...props}) => (
    <Button className={classNames(styles.button, className)} {...props}>
        <Icon icon={icon} className={styles.icon}/>
    </Button>
)