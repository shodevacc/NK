import React from "react"
import { Close, EmptyCart } from "./HomeImages"
import Img from "./BuyImages"
import { useSelector, useDispatch } from "react-redux"
import { useSpring, animated } from "react-spring"
import styles from "../styles/cart.module.css"
import { ToggleCart } from "../Redux/actions/ToggleCart"
import { Link } from "gatsby"
import CartList from "./CartList"

export default function Cart() {
  const ToggleState = useSelector(state => state.togglecart.toggle)
  const cartBodyAnimation = useSpring({
    display: ToggleState ? "flex" : "none",
    from: {
      display: "none",
    },
  })

  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const GST = useSelector(state => state.products.tax)
  // console.log("GST", GST)
  //Scroll to products
  const handleRedirect = () => {
    dispatch(ToggleCart())
    window.location.href = "/#OurProducts"
  }

  const CartContent = () => {
    return (
      <animated.div
        style={{
          ...cartBodyAnimation,
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
        }}
      >
        <CartList />
      </animated.div>
    )
  }

  return (
      <CartContent />
  )
}
