'use client'

import { FC, PropsWithChildren } from "react"
import styles from"./ThePopUpWrapper.module.scss"

const ThePopUpWrapper:FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={styles.popUpWrapper}>
      {children}
    </div>
  )
}

export default ThePopUpWrapper
