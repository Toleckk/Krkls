import React, {HTMLAttributes, ReactElement} from 'react'
import c from 'classnames'
import s from './Panel.module.scss'

export type PanelProps = {
  title?: string
} & HTMLAttributes<HTMLDivElement>

export const Panel: React.FC<PanelProps> = ({
  title,
  className,
  children,
  ...props
}: PanelProps): ReactElement<PanelProps, 'section'> => (
  <section className={c(s.panel, className)} {...props}>
    {!!title && <h1 className={s.title}>{title}</h1>}
    <div className={s.content}>{children}</div>
  </section>
)
