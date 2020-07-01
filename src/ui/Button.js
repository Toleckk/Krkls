import React from 'react'
import classNames from 'classnames'
import styles from './Button.module.scss'

export const Button = ({children, available = true, className, ...props}) => (
    <button className={classNames(className, styles.button, {[styles.available]: available})} {...props}>
        {children}
    </button>
)