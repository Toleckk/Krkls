import React, {BaseHTMLAttributes} from 'react'
import c from 'classnames'
import {restrictPercents} from './helpers'
import s from './Line.module.scss'

export type LineProps = {
  value: number
} & BaseHTMLAttributes<HTMLDivElement>

export const Line: React.FC<LineProps> = ({value, className, style = {}, ...props}) => (
  <div className={c(s.container, className)} {...props}>
    <div className={s.progress} style={{...style, minWidth: restrictPercents(value) + '%'}} />
  </div>
)
