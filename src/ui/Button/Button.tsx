import React, {ButtonHTMLAttributes, MouseEventHandler} from 'react'
import c from 'classnames'
import s from './Button.module.scss'

export type ButtonProps = {
  available?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  size?: 'md' | 'lg'
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<ButtonProps> = ({
  available = true,
  className,
  children,
  size = 'md',
  ...props
}) => (
  <button className={c(className, s.button, {[s.available]: available}, s[size])} {...props}>
    {children}
  </button>
)
