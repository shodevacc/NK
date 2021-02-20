import React from "react"
import Img from './HomeImages'
import InfoImg from '../images/InfoBG.jpg'
import styles from "../styles/about.module.css"

function About() {
  return (
    <div className={styles.container}>
      <div className={styles.stackTop}>
        <div className={`${styles.card} ${styles.infoCard}`}>
          <h5 className={styles.cardTitle}>WHO WE ARE</h5>
          <h6 className={styles.cardSubtitle}>Card subtitle</h6>
          <p style={{textAlign:"justify"}}>
            We started our business in 2020 with one goal in mind: Making
            biryani and its many varieties available at the click of a button.
            Experience the mouth watering flavours for yourself. Thanks to our
            experience and dedication, we’ve managed to become masters of the
            craft. Providing dishes that are fresh, hearty and simply
            unforgettable.
          </p>
        </div>
      </div>
      <div className={styles.stackBottom}>
          <Img className={`${styles.InfoBackgroundHeight}`} src="InfoBG"/>
      </div>
    </div>
  ) 
}

export default About
