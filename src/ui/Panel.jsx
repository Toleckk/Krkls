import React from 'react'
import styles from './Panel.module.scss'

export const Panel = ({title, content}) => (
  <section className={styles.panel}>
    <h1 className={styles.title}>{title}</h1>
    <section className={styles.content}>{content}</section>
  </section>
)
