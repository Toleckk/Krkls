import React, {HTMLAttributes} from 'react'
import c from 'classnames'
import {Divider, Effects} from '@krkls/ui'
import s from './ItemCard.module.scss'

export type ItemCardProps = {
  item: {
    bigImage?: string
    image?: string
    name: string
    info?: Record<string, string | number | undefined>
    effects?: string[]
  }
} & HTMLAttributes<HTMLDivElement>

export const ItemCard: React.FC<ItemCardProps> = ({item, children, className, ...props}) => {
  const image = 'bigImage' in item ? item.bigImage || item.image : item.image

  return (
    <div className={c(s.card, className)} {...props}>
      <div className={s.title}>
        <div className={s.image}>
          <img src={image} alt={item.name} />
        </div>
        <span className={s.name}>{item.name}</span>
      </div>
      <Divider color="secondary" />
      <div className={s.info}>
        <div className={s.scrollable}>
          <div style={{height: '100%'}}>
            {item.info ? (
              <table style={{width: '100%'}}>
                <tbody>
                  {Object.keys(item.info).map(key => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td style={{textAlign: 'end'}}>{item.info?.[key]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <span style={{textAlign: 'center'}}>Информации пока нет!</span>
            )}
            {'effects' in item && !!item.effects && <Effects effects={item.effects} />}
          </div>
        </div>
      </div>
    </div>
  )
}
