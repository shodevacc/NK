import React from "react"
// import { Instagram } from "../Images"
import { Insta, Facebook, Twitter } from "../SVG"
import styles from '../styles/footer.module.css'

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left}>
          <p>N.K. Catering Group</p>
        </div>
        <ul className={styles.right}>
          <li>
           <Insta style={{height:'25px'}}/>
          </li>
          <li>
            <Facebook style={{height:'25px'}}/>
          </li>
        </ul>
      </div>
    </div>
  )
}
