import React from 'react'
import styles from '../styles/closeIcon.module.css'
function CloseIcon({style}) {
    return (
        <div style={style} className={styles.closeIcon}>
        <div></div>
        <div></div>
      </div>
    )
}

export default CloseIcon
