import React from "react"
import styles from "../styles/testimonialCard.module.css"
import img from "../images/gatsby-astronaut.png"

function TestimonialCard({details}) {
  return (
    <div className={styles.padding}>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <img src={details.src} />
          <p>{details.imgTitle}</p>
        </div>
        <div className={styles.info}>
          <h4>{details.title}</h4>
         {details.info}
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard
