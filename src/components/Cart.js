import React from "react"
import { Close, EmptyCart } from "./HomeImages"
import Img from "./BuyImages"
// import { EmptyCart, Close } from '../SVG'
import { useSelector, useDispatch } from "react-redux"
import { useSpring, animated } from "react-spring"
// import Spinner from './Spinner'
// import Error from './Error'
import styles from "../styles/cart.module.css"
// import { CartProductIcon } from '../Images'

// import { delCartProducts } from '../Redux/actions/CartActions'
import { ToggleCart } from "../Redux/actions/ToggleCart"
import { DelItem } from "../Redux/actions/CartActions"
import { Link } from "gatsby"

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

    const handleDelete = id => {
      dispatch(DelItem(id))
    }
  var total = 0
  const CartContent = () => {
 if (cart.CartProducts.length > 0) {
      return (
        <animated.div
          style={{
            ...cartBodyAnimation,
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            width:"100%"
          }}
        >
          {cart.CartProducts.map((item, index) => {
            total += item.price
            return (
              <div key={item.id} className={styles.cartCard}>
                <Link onClick={()=>{dispatch(ToggleCart())}} to={item.link}>
                  <div className={styles.cartCardImg}>
                    <Img
                      style={{ height: "15rem", width: "15rem" }}
                      src={item.src}
                    />
                  </div>
                </Link>
                <div className={styles.cartCardInfo}>
                  <div
                    className={styles.cartCardClose}
                    onClick={() => handleDelete(item.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <Close height="1.5rem" width="1.5rem" color="red" />
                  </div>
                  <h6>{item.title}</h6>
                  <p style={{ color: "red" }}>MRP: ₹{item.price} </p>
                  <p>Net: {item.weight}kg</p>
                  {/* <p>Serves: {item.serves}</p> */}
                </div>
              </div>
            )
          })}
          <div className={styles.cartTotal}>
            <p>GST ({GST}%)</p>
            <p>₹ {(total * GST) / 100}</p>
          </div>
          <div className={styles.cartTotal}>
            <p>Total</p>
            <p>₹ {total + (total * GST) / 100}</p>
          </div>
          <a style={{ paddingBottom: "2rem" }} href="/#OurProducts">
            <button
              // onClick={() => handleRedirect()}
              className="logo-red-btn"
              style={{ cursor: "pointer", textAlign: "center" }}
            >
              Shop More
            </button>
          </a>
          <a style={{ paddingBottom: "2rem" }} href="/checkout/">
            <button
              // onClick={() => handleRedirect()}
              className="logo-red-btn"
              style={{ cursor: "pointer", textAlign: "center" }}
            >
              Continue to checkout
            </button>
          </a>
        </animated.div>
      )
    } else {
      return (
        <animated.div
          style={{
            ...cartBodyAnimation,
            paddingTop: "2rem",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
          }}
        >
          <h5 style={{ textAlign: "center", color: "black" }}>
            No Items in cart.
          </h5>
          <EmptyCart width="8rem" height="8rem" />
          <button
            onClick={() => handleRedirect()}
            className="logo-red-btn"
            style={{
              cursor: "pointer",
              textAlign: "center",
              marginTop: "5rem",
            }}
          >
            Check Out our products
          </button>
        </animated.div>
      )
    }
  }
  //   return <CartContent />

  return (
    <div className={styles.container}>
      <CartContent />
    </div>
  )
}
