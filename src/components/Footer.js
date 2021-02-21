import React from "react"
// import { Instagram } from "../Images"
// import { Insta, Facebook, Twitter } from "../SVG"
import styles from '../styles/footer.module.css'

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left}>
          <p>N.K.</p>
        </div>
        <ul className={styles.right}>
          <li>
           INsta
          </li>
          <li>
            <i className="fab fa-facebook-f"></i>
           Face
          </li>
          <li>
           Twitter
          </li>
        </ul>
      </div>
    </div>
  )
}
