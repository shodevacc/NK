import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Close, EmptyCart } from "./HomeImages"
import { ToggleCart } from "../Redux/actions/ToggleCart"
import styles from "../styles/CartList.module.css"
import { Link } from "gatsby"
import { DelItem } from "../Redux/actions/CartActions"
import Img from "./BuyImages"

function CartList({ hideCheckout }) {
  // console.log("HIDE",hideCheckout)
  const isBrowser = typeof window !== "undefined"
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const GST = useSelector(state => state.products.tax)
  const toggleState = useSelector(state => state.togglecart)
  var total = 0
  const handleDelete = id => {
    dispatch(DelItem(id))
  }
  const handleRedirect = () => {
    dispatch(ToggleCart())
    window.location.href = "/#OurProducts"
  }
  const CartContent = () => {
    if (cart.CartProducts.length > 0) {
      return (
        <React.Fragment>
          <React.Fragment>
            {isBrowser &&
              cart.CartProducts.map((item, index) => {
                total += item.price
                return (
                  <div key={item.id} className={styles.cartCard}>
                    <Link
                      onClick={() => {
                        dispatch(ToggleCart())
                      }}
                      to={item.link}
                    >
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
          </React.Fragment>

          <React.Fragment>
            <Link
              onClick={() => {
                !hideCheckout && dispatch(ToggleCart())
              }}
              style={{ paddingBottom: "2rem" }}
              to="/#OurProducts"
            >
              <button
                className="logo-red-btn"
                style={{ cursor: "pointer", textAlign: "center" }}
              >
                Shop More
              </button>
            </Link>
            {/* Hide the checkout option if asked to do so */}
            {!hideCheckout && (
              <Link
                onClick={() => dispatch(ToggleCart())}
                style={{ paddingBottom: "2rem" }}
                to="/checkout"
              >
                <button
                  className="logo-red-btn"
                  style={{ cursor: "pointer", textAlign: "center" }}
                >
                  Continue to checkout
                </button>
              </Link>
            )}
          </React.Fragment>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <h5 style={{ textAlign: "center", color: "black" }}>
            No Items in cart.
          </h5>
          <EmptyCart width="8rem" height="8rem" />
          <Link
            onClick={() => {
              !hideCheckout && dispatch(ToggleCart())
            }}
            to="/#OurProducts"
          >
            <button
              className="logo-red-btn"
              style={{
                cursor: "pointer",
                textAlign: "center",
                marginTop: "5rem",
              }}
            >
              Check out our products
            </button>
          </Link>
        </React.Fragment>
      )
    }
  }
  return (
    <div className={styles.container}>
      <CartContent />
    </div>
  )
}

export default CartList
