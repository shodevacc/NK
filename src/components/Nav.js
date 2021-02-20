import React, { useState, useRef, useEffect } from "react"
import { Link } from "gatsby"
// import CartIcon from "../SVG/Carticon.svg"
import Img, { Close, CartIcon } from "./HomeImages"
import BiryaniLogo from "../images/Home/biryani-logo.jpg"
import { useSpring, animated, useChain } from "react-spring"
import styles from "../styles/nav.module.css"

import { useSelector, useDispatch } from "react-redux"
// import { fetchProduct } from '../Redux/actions/ProductActions'
// import { autoCheckState } from '../Redux/actions/UserActions'
import { ToggleCart } from "../Redux/actions/ToggleCart"

import Cart from "./Cart"

export default function TestNav() {
  const isBrowser = typeof window !== "undefined" //Check if window is avaialble
  const dispatch = useDispatch()

  const ToggleState = useSelector(state => state.togglecart.toggle)
  const [innerWidth, setInnerWidth] = useState(100)
  const [toggleDrop, setToggleDrop] = useState(false)
  // setCollapse()
  const [collapse, setCollapse] = useState(
    isBrowser ? (window.innerWidth > 786 ? false : true) : false
  )
  console.log("COLLAPSE STATE", collapse)
  const NavItems = ({ style, buttonStyle, className }) => {
    return (
      <ul className={`${styles.navList} ${className}`}>
        <li>
          <Link style={style || { color: "white" }} to="/contact">
            <p>Contact Us</p>
          </Link>
        </li>
        <li>
          <a style={style || { color: "white" }} href="/#OurProducts">
            <p>View Products</p>
          </a>
        </li>
        <li>
          <button
            onClick={() => dispatch(ToggleCart())}
            className="logo-red-btn"
            style={buttonStyle || { color: "black" }}
          >
            <CartIcon width="1.8rem" height="1.8rem" />
          </button>
        </li>
      </ul>
    )
  }

  const OrderItems = () => {
    if (!collapse) {
      // console.log("Not collapse")
      return <NavItems />
    } else {
      // console.log("Collapse")
      return (
        <div
          onClick={() => setToggleDrop(state => !state)}
          className={styles.hamburgerIcon}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      )
    }
  }
  // React Spring styling
  const dropdownRef = useRef()
  const dropdown = useSpring({
    ref: dropdownRef,
    background: toggleDrop ? "grey" : "black",
    height: toggleDrop ? "170px" : "0px",
    from: {
      height: "0px",
    },
  })
  const dropdownItemRef = useRef()
  const dropdownItems = useSpring({
    ref: dropdownItemRef,
    display: toggleDrop ? "flex" : "none",
    from: {
      display: "none",
    },
  })
  useChain(
    toggleDrop
      ? [dropdownRef, dropdownItemRef]
      : [dropdownItemRef, dropdownRef],
    [0, 0.1]
  ) //last part is for timing b/w transitions

  const cartAnimation = useSpring({
    width:
      isBrowser && ToggleState ? `${innerWidth * (3 / 20) + 260}px` : "0px",
    from: {
      width: "0px",
    },
  })

  // React Spring styling
  isBrowser &&
    (window.onresize = () => {
      setInnerWidth(window.innerWidth)
      if (!collapse && window.innerWidth <= 786) {
        setCollapse(true)
        setToggleDrop(false)
      } else if (collapse && window.innerWidth > 786) {
        setCollapse(false)
        setToggleDrop(false)
      }
    })
  return (
    <div className={styles.container}>
      <animated.div style={cartAnimation} className={styles.cart}>
        <div className={styles.cartHead}>
          <h5>Order Summary</h5>
          <div
            className={styles.hoverImage}
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(ToggleCart())}
          >
            <Close height="2rem" width="2rem" color="red" />
          </div>
        </div>
        {/* <hr style={{width:'100%'}}/> */}
        <Cart />
      </animated.div>
      <nav>
        <div className={styles.LogoContainer}>
          <Link to="/">
            <Img
              style={{ height: "10rem", width: "10rem", borderRadius: "50%" }}
              src="biryani-logo"
            />
          </Link>
        </div>
        <OrderItems />
      </nav>
      <animated.div
        style={{ ...dropdown, position: "relative" }}
        className="Collapse-content"
      >
        <animated.div style={{ ...dropdownItems }}>
          <NavItems
            buttonStyle={{ padding: "1.3rem 3rem", margin: "1em 1em" }}
            style={{ fontSize: "1.5rem", color: "white", margin: "10px 0" }}
          />
        </animated.div>
      </animated.div>
    </div>
  )
}
