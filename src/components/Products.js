import { element } from "prop-types"
import React, { useEffect } from "react"
import styles from "../styles/product.module.css"

function Products({ products }) {
  useEffect(() => {
    const setColor = (element, color) => {
      for (let i = 0; i < element.length; i++) {
        Object.assign(element[i].style, { "background-color": color })
      }
    }
    const handleScroll = e => {
      var slider = e.target //Scrolling element
      var left = slider.scrollLeft //Left scroll amount
      var scrollTotal =
        slider.children[0].getBoundingClientRect().width - window.innerWidth //the total amount the elemnt can be scrolled (the width of the showcaseCArdCollection element - window.innerWidth)
      var leftArrows = slider.children[1].children[0].children
      var rightArrows = slider.children[1].children[1].children
      // console.log(left, scrollTotal, slider.children[0])
      // console.log("left", leftArrows, "right", rightArrows)
      if (!(left == 0 || left == scrollTotal)) {
        // console.log("Middle")
        //If scroll is not at beginning and end
        setColor(leftArrows, "black")
        setColor(rightArrows, "black")
      } else {
        if (left == 0) {
          // console.log("Neginnning")
          //If scroll is at beginning
          setColor(leftArrows, "gray")
        } else {
          // console.log("End")
          //If scroll is at end
          setColor(rightArrows, "gray")
        }
      }
    }
    const handleLeftClick = e => {
      var slider = e.target
      //Get the parent Slider element
      while (slider.className != styles.showcaseSliderContainer) {
        slider = slider.parentElement
      }
      var left = slider.scrollLeft //Left scroll amount
      var scrollTotal = slider.getBoundingClientRect().width //the total amount the elemnt can be scrolled
      var scrollto = Math.ceil(left / scrollTotal - 1) //Check which pos to scroll to
      slider.scrollTo({
        top: 0,
        left: window.innerWidth * scrollto,
        behavior: "smooth",
      })
    }
    const handleRightClick = e => {
      var slider = e.target
      //Get the parent Slider element
      while (slider.className != styles.showcaseSliderContainer) {
        slider = slider.parentElement
      }
      var left = slider.scrollLeft //Left scroll amount
      var scrollTotal = slider.getBoundingClientRect().width //the total amount the elemnt can be scrolled
      var scrollto = Math.floor(left / scrollTotal + 1) //Check which pos to scroll to
      slider.scrollTo({
        top: 0,
        left: window.innerWidth * scrollto,
        behavior: "smooth",
      })
    }
    var slider = document.querySelectorAll(`.${styles.showcaseSliderContainer}`) //Slider element
    var LeftArrows = document.querySelectorAll(`.${styles.leftArrow}`) //Arrows
    var RightArrows = document.querySelectorAll(`.${styles.rightArrow}`) //Arrows

    slider.forEach(element => {
      element.addEventListener("scroll", handleScroll)
    })
    LeftArrows.forEach(arrow => {
      arrow.addEventListener("click", handleLeftClick)
    })
    RightArrows.forEach(arrow => {
      arrow.addEventListener("click", handleRightClick)
    })

    return () => {
      slider.forEach(element => {
        element.removeEventListener("scroll", handleScroll)
      })
      LeftArrows.forEach(arrow => {
        arrow.removeEventListener("click", handleLeftClick)
      })
      RightArrows.forEach(arrow => {
        arrow.removeEventListener("click", handleRightClick)
      })
    }
  }, [])
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
  const Arrows = ({ id }) => {
    return (
      <div className={styles.arrowContainer}>
        <div className={styles.leftArrow}>
          <div className={styles.arrow}></div>
          <div className={styles.arrow}></div>
        </div>
        <div className={styles.rightArrow}>
          <div className={styles.arrow}></div>
          <div className={styles.arrow}></div>
        </div>
      </div>
    )
  }
  const Products = ({ Range, products }) => {
    return (
      <React.Fragment>
        <h3 style={{ marginBottom: "5rem" }}>{Range} Collection</h3>
        <div className={styles.showcaseContainer}>
          <Waves />
          <div
            // onScroll={`handleScroll('${Range}Slider')`}
            id={`${Range}Slider`}
            className={styles.showcaseSliderContainer}
          >
            <div
              style={{
                width: `${products.length * 100}vw`,
              }}
              className={styles.showcaseCardCollection}
            >
              {products.map((product,index) => {
                return (
                  <div key={`${product.title} ${index}`} className={styles.showcaseCard}>
                    <a href="{{prod.get_info_url}}">
                      <div className={styles.showcaseCardImage}>
                        <img
                          style={{ height: "100%", width: "100%" }}
                          src={product.src}
                        />
                      </div>
                    </a>
                    <div className={styles.showcaseCardInfo}>
                      <h5>{product.title}</h5>
                      <p>{product.small_description}</p>
                      <p style={{ color: "red" }}>₹{product.price}</p>
                      <p className="text-mute text-small">{product.serves} </p>
                    </div>
                  </div>
                )
              })}
            </div>
            <Arrows id={`${Range}Slider`} />
          </div>
        </div>
      </React.Fragment>
    )
  }
  return (
    <div id="OurProducts" className={styles.container}>
      <h2
        style={{ textAlign: "center", marginBottom: "5rem", marginTop: "1rem" }}
      >
        Our Royal Selection
      </h2>
      <Products Range="Chicken" products={products.chicken} />
      <Products Range="Mutton" products={products.mutton} />
    </div>
  )
}

export default Products
