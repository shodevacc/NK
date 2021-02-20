import React from "react"
import { Close,EmptyCart } from "./HomeImages"
// import { EmptyCart, Close } from '../SVG'
import { useSelector, useDispatch } from "react-redux"
import { useSpring, animated } from "react-spring"
// import Spinner from './Spinner'
// import Error from './Error'
import styles from "../styles/cart.module.css"
// import { CartProductIcon } from '../Images'

// import { delCartProducts } from '../Redux/actions/CartActions'
import { ToggleCart } from "../Redux/actions/ToggleCart"

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

  //   const handleDelete = id => {
  //     dispatch(delCartProducts(id))
  //   }
  var total = 0
  const CartContent = () => {
    if (cart.CartLoading) {
      console.log("Loading")
      //   return <Spinner height="10rem" width="10rem" />
    } else if (cart.CartError) {
      console.log("ERROR")
      // return <Error error={cart.CartError} />
    } else if (cart.CartProducts.length > 0) {
      return (
        <animated.div
          style={{
            ...cartBodyAnimation,
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {cart.CartProducts.map((item, index) => {
            total += item.price
            return (
              <div key={item.id} className={styles.cartCard}>
                <a href={`/order/${item.id}/`}>
                  <div className={styles.cartCardImg}>
                    {/* <CartProductIcon
                      category={item.category}
                      title={item.title}
                      height="15rem"
                      width="15rem"
                    /> */}
                  </div>
                </a>
                <div className={styles.cartCardInfo}>
                  <div
                    className={styles.cartCardClose}
                    // onClick={() => handleDelete(item.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <Close height="1.5rem" width="1.5rem" color="red" />
                  </div>
                  <h6>{item.title}</h6>
                  <p className="text-mute">{item.category}</p>
                  <p style={{ color: "red" }}>
                    ₹{item.price}{" "}
                    <span className="text-mute">
                      ({item.quantity} ×{item.price / item.quantity})
                    </span>
                  </p>
                  <p>Qty: {item.quantity}</p>
                  <p>
                    Net: {item.weight * item.quantity}g ({item.weight}×
                    {item.quantity})
                  </p>
                  <p>Serves: {item.serves}</p>
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
            width:"100%",
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
