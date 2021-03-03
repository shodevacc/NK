import React, { useState, useEffect } from "react"
import TestimonialCard from "./TestimonialCard"
import img from "../images/gatsby-astronaut.png"
import styles from "../styles/testimonial.module.css"
import { useTransition, useSpring, animated } from "react-spring"
function Testimonial() {
  const details = [
    {
      src: img,
      imgTitle: "This is an important person!!",
      title: "Grand Opening 1!",
      info: (
        <p>We had an openeing for something and a lot of people had fun!</p>
      ),
    },
    {
      src: img,
      imgTitle: "This is also an important person!!",
      title: "Grand Opening 2!",
      info: (
        <p>We had an openeing for something and a lot of people had fun!</p>
      ),
    },
    {
      src: img,
      imgTitle: "This is also an important person!!",
      title: "Grand Opening 3!",
      info: (
        <p>We had an openeing for something and a lot of people had fun!</p>
      ),
    },
    {
      src: img,
      imgTitle: "This is also an important person!!",
      title: "Grand Opening 4!",
      info: (
        <p>We had an openeing for something and a lot of people had fun!</p>
      ),
    },
  ]
  const [index, setIndex] = useState(0)

  const props = useSpring({ transform: `translate3d(${index * -100}%,0,0)` })
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(() => setIndex((index + 1) % details.length))
    }, 3000)
    return () => {
      clearInterval(timer)
    }
  }, [index])
  return (
    <div className={styles.container}>
      <h2>Highlights</h2>
      <div className={styles.padding}>
        {
          <animated.div className={styles.cardContainer} style={props}>
            {details.map(item => {
              return <TestimonialCard details={item} />
            })}
          </animated.div>
        }
      </div>
      <ul className={styles.buttons}>
        {details.map((item, i) => {
          return (
            <li
              style={{
                background: i == index ? "white" : "rgb(255 255 255 / 21%)",
              }}
              onClick={() => setIndex(i)}
            ></li>
          )
        })}
      </ul>
    </div>
  )
}

export default Testimonial
