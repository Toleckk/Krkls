import React, {HTMLAttributes} from 'react'
import c from 'classnames'
import s from './Loader.module.scss'

export type LoaderProps = HTMLAttributes<HTMLDivElement>

export const Loader: React.FC<LoaderProps> = ({className, ...props}) => (
  <div className={c(s.loader, className)} {...props}>
    Зарузка...
  </div>
)
