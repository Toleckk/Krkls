import React from 'react'
import c from 'classnames'
import {Button, ButtonProps} from '../Button'
import {Icon, IconProps} from '../Icon'
import s from './ControlButton.module.scss'

export type ControlButtonProps = {
  icon: IconProps['icon']
} & ButtonProps

export const ControlButton: React.FC<ControlButtonProps> = ({icon, className, ...props}) => (
  <Button className={c(s.button)} {...props}>
    <Icon icon={icon} className={s.icon} />
  </Button>
)
