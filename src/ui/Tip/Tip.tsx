import React, {HTMLAttributes} from 'react'
import c from 'classnames'
import s from './Tip.module.scss'

export type TipProps = HTMLAttributes<HTMLDivElement>

export const Tip: React.FC<TipProps> = ({className, children, ...props}) => (
  <span className={c(s.tip, className)} {...props}>
    {children}
  </span>
)
