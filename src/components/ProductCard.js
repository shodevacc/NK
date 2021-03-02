import React, { useEffect, useState, useRef } from "react"
import Img from "./HomeImages"
import styles from "../styles/productCard.module.css"
import { Link } from "gatsby"

function ProductCard({ productInfo, circleStyle, dir }) {
  var card = useRef(null)
  var container = useRef(null)
  const [scrollMove, setScrollMove] = useState(true)
  var title = useRef(null)
  var description = useRef(null)
  useEffect(() => {
    //Move card
    const moveCard = (xAxis, yAxis) => {
      card.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`
    }
    //Popout Image
    const popout = zTranslate => {
      //   title.current.style.transform = `translateZ(150px)`
      product.style.transform = `translateZ(${zTranslate})`
    }
    //To animate the card when visible
    const handleScroll = () => {
      var CurrentContainer = container.current
      var CurrentCard = card.current
      var containerDetails = CurrentContainer.getBoundingClientRect()
      if (scrollMove && window.innerHeight * 0.4 > containerDetails.top) {
        //Move the card
        Object.assign(CurrentCard.style, {
          transition: "all 0.4s ease",
          pointerEvents: "none",
        })
        Object.assign(CurrentContainer.style, { pointerEvents: "none" })
        setTimeout(() => {
          moveCard(dir * -25, 25)
        }, 25)
        popout("120px")
        setTimeout(() => {
          moveCard(dir * 25, -25)
        }, 400)
        setTimeout(() => {
          moveCard(0, 0)
          popout("0px")
          //Dont alllow this to happen more than once
          setScrollMove(false)
          //Enable all pointer events
        }, 800)
        setTimeout(() => {
          Object.assign(CurrentCard.style, {
            transition: "0",
            pointerEvents: "auto",
          })
          Object.assign(CurrentContainer.style, { pointerEvents: "auto" })
        }, 1200)
      }
    }

    var product = document.querySelectorAll(`.${styles.img}`)[productInfo.num]

    const handleMouseMove = e => {
      if (!scrollMove) {
        let containerRect = container.current.getBoundingClientRect() //Get the rect to get top and height of container element
        let xAxis = window.innerWidth / 2 - e.pageX //Get the posX of the cursor on the container from the center
        let yAxis =
          window.pageYOffset +
          containerRect.top -
          e.pageY +
          containerRect.height / 2 //Get the posY of the cursor on the container from the center
        //For the moving animation
        moveCard(-xAxis / 25, yAxis / 25)
        //For the moving animation
        // Popout effect
        popout("120px")
        //Popout effect
      }
    }
    // Move on phone
    const handleTouchMove = e => {
      if (!scrollMove) {
        e.preventDefault()
        let containerRect = container.current.getBoundingClientRect() //Get the rect to get top and height of container element
        let xAxis = window.innerWidth / 2 - e.changedTouches[0].pageX //Get the posX of the cursor on the container from the center
        let yAxis =
          window.pageYOffset +
          containerRect.top -
          e.changedTouches[0].pageY +
          containerRect.height / 2 //Get the posY of the cursor on the container from the center
        moveCard(-xAxis / 10, yAxis / 10)
        popout("120px")
      }

      //   console.log(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
    }

    // Disable any delay in movement of card on start
    const handleMouseEnter = () => {
      !scrollMove && (card.current.style.transition = "none")
    }
    const handleTouchStart = e => {
      !scrollMove && (card.current.style.transition = "none")
    }
    // Disable any delay in movement of card on start

    // Reset all animations to rest position
    const handleTouchEnd = e => {
      if (!scrollMove) {
        card.current.style.transition = "all 0.5s ease"
        //Reset the card to initial pos(Without rotation)
        moveCard(0, 0)
        // Remove Popout effect
        popout("0px")
        //Remove Popout effect
      }
    }

    // Reset all animations to rest position
    const handleLeave = e => {
      if (!scrollMove) {
        card.current.style.transition = "all 0.5s ease"
        //Reset the card to initial pos(Without rotation)
        moveCard(0, 0)
        // Remove Popout effect
        popout("0px")
        //Remove Popout effect
      }
    }

    window.addEventListener("scroll", handleScroll)
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
      window.removeEventListener("scroll", handleScroll)

      container.current.removeEventListener("mouseenter", handleMouseEnter)
      card.current.removeEventListener("touchstart", handleTouchStart)

      container.current.removeEventListener("mousemove", handleMouseMove)
      card.current.removeEventListener("touchmove", handleTouchMove)

      container.current.removeEventListener("mouseleave", handleLeave)
      card.current.removeEventListener("touchend", handleTouchEnd)
    }
  }, [scrollMove])

  return (
    <React.Fragment>
      <div ref={container} className={styles.container}>
        <div ref={card} className={styles.card}>
          <div className={styles.product}>
            <div style={circleStyle} className={styles.circle}></div>
            <Img className={styles.img} src={productInfo.src} />
          </div>
          <div className={styles.info}>
            <h3 ref={title} style={{ color: "white" }}>
              {productInfo.title}
            </h3>
            <p>{productInfo.info}</p>
            <p style={{ color: "red" }}>₹{productInfo.price}</p>
            <p>
              <Link className={styles.order} to={productInfo.link}>
                Order Now
              </Link>
            </p>
            <p>*Minimum 6 hours in advance*</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ProductCard
