import React, { useEffect, useRef } from "react"
import Img from "./HomeImages"
import styles from "../styles/productCard.module.css"
import { Link } from "gatsby"

function ProductCard({productInfo,circleStyle}) {
  const isBrowser=typeof window!=='undefined'
  var card = useRef(null)
  var container = useRef(null)

  var title = useRef(null)
  var description = useRef(null)
  useEffect(() => {
    var product = document.querySelectorAll(`.${styles.img}`)[productInfo.num]
    // console.log("REFS", title.current, product)
    const handleMouseMove = e => {
      let containerRect = container.current.getBoundingClientRect() //Get the rect to get top and height of container element
      let xAxis = window.innerWidth / 2 - e.pageX //Get the posX of the cursor on the container from the center
      let yAxis =
        window.pageYOffset +
        containerRect.top -
        e.pageY +
        containerRect.height / 2 //Get the posY of the cursor on the container from the center
      //   console.log(
      //     xAxis,
      //     e.clientY,
      //     window.pageYOffset + containerRect.top-,
      //     yAxis
      //   )
      //For the moving animation
      card.current.style.transform = `rotateY(${-xAxis / 25}deg) rotateX(${
        yAxis / 25
      }deg)`
      //For the moving animation
      // Popout effect
      //   title.current.style.transform = `translateZ(150px)`
      product.style.transform = `translateZ(120px)`
      //Popout effect
    }
    // Move on phone
    const handleTouchMove = e => {
      e.preventDefault()
      let containerRect = container.current.getBoundingClientRect() //Get the rect to get top and height of container element
      let xAxis = window.innerWidth / 2 - e.changedTouches[0].pageX //Get the posX of the cursor on the container from the center
      let yAxis =
        window.pageYOffset +
        containerRect.top -
        e.changedTouches[0].pageY +
        containerRect.height / 2 //Get the posY of the cursor on the container from the center
      card.current.style.transform = `rotateY(${-xAxis / 10}deg) rotateX(${
        yAxis / 10
      }deg)`
      product.style.transform = `translateZ(120px)`
      //   console.log(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
    }

    // Disable any delay in movement of card on start
    const handleMouseEnter = () => {
      card.current.style.transition = "none"
    }
    const handleTouchStart = e => {
      card.current.style.transition = "none"
    }
    // Disable any delay in movement of card on start

    // Reset all animations to rest position
    const handleTouchEnd = e => {
      card.current.style.transition = "all 0.5s ease"
      //Reset the card to initial pos(Without rotation)
      card.current.style.transform = `rotateY(0deg) rotateX(0deg)`
      // Remove Popout effect
      // title.current.style.transform = `translateZ(0px)`
      product.style.transform = `translateZ(0px)`
      //Remove Popout effect
    }

    const handleLeave = e => {
      card.current.style.transition = "all 0.5s ease"
      //Reset the card to initial pos(Without rotation)
      card.current.style.transform = `rotateY(0deg) rotateX(0deg)`
      // Remove Popout effect
      title.current.style.transform = `translateZ(0px)`
      product.style.transform = `translateZ(0px)`
      //Remove Popout effect
    }
    // Reset all animations to rest position

    // Disable any delay in movement of card on start
    container.current.addEventListener("mouseenter", handleMouseEnter)
    card.current.addEventListener("touchstart", handleTouchStart)
    //Add moving functionality to card
    container.current.addEventListener("mousemove", handleMouseMove)
    card.current.addEventListener("touchmove", handleTouchMove)
    //Reset card to initial pos
    container.current.addEventListener("mouseleave", handleLeave)
    card.current.addEventListener("touchend", handleTouchEnd)
    return () => {
      container.current.removeEventListener("mouseenter", handleMouseEnter)
      card.current.removeEventListener("touchstart", handleTouchStart)

      container.current.removeEventListener("mousemove", handleMouseMove)
      card.current.removeEventListener("touchmove", handleTouchMove)

      container.current.removeEventListener("mouseleave", handleLeave)
      card.current.removeEventListener("touchend", handleTouchEnd)
    }
  }, [])
  // console.log("CArd ref",card.current)
  //    var card=document.querySelector(styles.card);
  //    var container=document/querySelector(styles.container)
  const Waves = () => {
    return (
      <React.Fragment>
        <svg
          className={styles.wave}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          //   xmlns:v="https://vecta.io/nano"
        >
          <path
            fill="#f9090a"
            d="M0 160l30-16c30-16 90-48 150-48s120 32 180 58.7C420 181 480 203 540 208s120-5 180-32 120-69 180-64 120 59 180 58.7c60 .3 120-53.7 180-58.7s120 37 150 58.7l30 21.3v128H0z"
          />
        </svg>

        <svg
          className={styles.wave1}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          //   xmlns:v="https://vecta.io/nano"
        >
          <path
            fill="#f9090a"
            d="M0 160l30-16c30-16 90-48 150-48s120 32 180 58.7C420 181 480 203 540 208s120-5 180-32 120-69 180-64 120 59 180 58.7c60 .3 120-53.7 180-58.7s120 37 150 58.7l30 21.3v128H0z"
          />
        </svg>

        <svg
          className={styles.wave2}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          //   xmlns:v="https://vecta.io/nano"
        >
          <path
            fill="#f9090a"
            d="M0 160l30-16c30-16 90-48 150-48s120 32 180 58.7C420 181 480 203 540 208s120-5 180-32 120-69 180-64 120 59 180 58.7c60 .3 120-53.7 180-58.7s120 37 150 58.7l30 21.3v128H0z"
          />
        </svg>
      </React.Fragment>
    )
  }
  return (
    <div>
      {/* <Waves /> */}

      <div ref={container} className={styles.container}>
        <div ref={card} className={styles.card}>
          <div className={styles.product}>
            <div style={circleStyle} className={styles.circle}></div>
            <Img className={styles.img} src={productInfo.src} />
          </div>
          <div className={styles.info}>
            <h3 ref={title} style={{color:"white"}}>{productInfo.title}</h3>
            <p>{productInfo.info}</p>
            <p style={{ color: "red" }}>₹{productInfo.price}</p>
            <p><Link className={styles.order} to={productInfo.link}>Order Now</Link></p>
            <p>*Minimum 6 hours in advance*</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
