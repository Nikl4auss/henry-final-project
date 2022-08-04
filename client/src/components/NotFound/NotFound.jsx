import React from 'react'
import styles from "./NotFound.module.css"
import img from "../../img/error.png"

const NotFound = () => {
  return (
    <div>
        <div className={styles.notFound}>
        <img width={450} src={img} alt="not found" />
        </div>
    </div>
  )
}

export default NotFound