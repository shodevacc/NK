import React, { useState, useEffect } from "react"
import Img from './HomeImages'
import img from "../images/BiryaniShowCase.png"
import img2 from "../images/mutton.png"
import styles from "../styles/showcase.module.css"

function Showcase() {
  var imageSources = [<Img  className={`${styles.image}`} src="chicken"/>, <Img className={`${styles.image}`} src="mutton"/>]
  const [sourceIndex, setSourceIndex] = useState(0)
  useEffect(() => {
    const handleChange = () => {
      const imgElement = document.querySelector(`.${styles.image}`)
      // console.log("QUERY",imgElement)
      Object.assign(imgElement.style, { transform: "scale(0.8)", opacity: 0 }) //Make the Image fade out first
      setTimeout(() => {
        setSourceIndex(state => (state + 1) % imageSources.length) //Update the source after 250ms
        setTimeout(() => {
          Object.assign(imgElement.style, {
            transform: "scale(1.1)",
            opacity: 1,
          }) //Make the Image fade In after 250ms
        }, 350)
      }, 350)

      // console.log("TRIGGER")
    }
    var changeImg = setInterval(handleChange, 3000)
    return () => {
      clearInterval(changeImg)
    }
  }, [])
  return (
    <div className={styles.container}>
      <h2 className={styles.left}>N.K.</h2>
      {imageSources[sourceIndex]}
      {/* <img
        id="showcase-image"
        className={styles.image}
        src={imageSources[sourceIndex]}
      /> */}

      <div className={styles.info}>
        <h3>Authentic Mughal Taste</h3>
        <p className="text-mute">
          Biryani Royale promises you the flavour for which we have come to be
          known. Perfecting our craft for over 30 years.
        </p>
      </div>
    </div>
  )
}

export default Showcase
