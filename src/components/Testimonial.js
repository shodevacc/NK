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
  const [touchPos, setTouchPos] = useState({ start: 0, stop: 0 })

  const props = useSpring({ transform: `translate3d(${index * -100}%,0,0)` })
  useEffect(() => {
    const handleTouchStart = e => {
      console.log("STart", e.changedTouches[0].clientX)
      setTouchPos(state => {
        return { ...state, start: e.changedTouches[0].clientX }
      })
    }
    const handleTouchEnd = e => {
      var TouchEnd = e.changedTouches[0].clientX
      var distanceMoved = touchPos.start - TouchEnd
      //If enough distance is moved to be registered as a touch stroke
      if (Math.abs(distanceMoved) > 20) {
        //If difference is -ve its a right stroke
        if (distanceMoved < 0) {
          setIndex(() =>
            ((index - 1) < 0 ? details.length - 1 : index - 1)
          )
        } else {
          setIndex(() => setIndex((index + 1) % details.length))
        }
      }
      setTouchPos(state => {
        return { ...state, stop: e.changedTouches[0].clientX }
      })
    }
    const timer = setInterval(() => {
      setIndex(() => setIndex((index + 1) % details.length))
    }, 3000)
    document
      .querySelector(`.${styles.cardContainer}`)
      .addEventListener("touchstart", handleTouchStart)
    document
      .querySelector(`.${styles.cardContainer}`)
      .addEventListener("touchend", handleTouchEnd)
    return () => {
      clearInterval(timer)
      document
        .querySelector(`.${styles.cardContainer}`)
        .removeEventListener("touchstart", handleTouchStart)
      document
        .querySelector(`.${styles.cardContainer}`)
        .removeEventListener("touchend", handleTouchEnd)
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
