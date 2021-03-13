import React, {HTMLAttributes} from 'react'
import c from 'classnames'
import s from './Divider.module.scss'

export type DividerProps = {
  color?: 'primary' | 'secondary'
  vertical?: boolean
} & HTMLAttributes<HTMLDivElement>

export const Divider: React.FC<DividerProps> = ({
  color = 'primary',
  vertical = false,
  className,
  ...props
}) => <div className={c(s.divider, s[color], {vertical}, className)} {...props} />
