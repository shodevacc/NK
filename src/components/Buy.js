import React, { useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
// import { addCartProduct, UpdateItem } from '../Redux/actions/CartActions'
// import { BuyImage } from "../../Images"
import Img from "./BuyImages"
import { ToggleCart } from "../Redux/actions/ToggleCart"
import styles from "../styles/buy.module.css"

export default function Buy({ pk, category, src, data }) {
  console.log("RENDERING Buy")
  const selectRef = useRef(null)
  const cart = useSelector(state => state.cart)
  // const quantity=useState(3)
  const dispatch = useDispatch()
  var addItem = true //Check if whether to update or add item
  const FilterCartProduct = cart.CartProducts.filter(prod => prod.id == pk)
  const CurrentProduct = {
    title: "chicken",
    weight: "500",
    serves: "2",
    price: 10,
    category: "CHICKEN",
  }
  //   const CurrentProduct = product.products.filter(item => item.id == pk)[0]
  var initialState = 3
  if (cart.CartProducts.length > 0 && FilterCartProduct.length > 0) {
    //if product exists in cart
    addItem = false
    initialState = FilterCartProduct[0].quantity
  } else {
    initialState = 1
  }
  const [quantity, setQuantity] = useState(3)

  const SubmitButton = () => {
    if (
      FilterCartProduct.length > 0 &&
      quantity == FilterCartProduct[0].quantity
    ) {
      return (
        <button className="logo-red-btn-disabled" type="submit">
          No Changes
        </button>
      )
    } else {
      return (
        <input
          onClick={event => handleSubmit(event)}
          className="logo-red-btn "
          type="submit"
          value="confirm"
        />
      )
    }
  }

  const handleSubmit = event => {
    console.log(event, event.target)
    console.log(selectRef.current.value)
    event.preventDefault()
    event.stopPropagation()

    if (addItem) {
      const info = {
        id: Number(CurrentProduct.id),
        title: CurrentProduct.title,
        quantity: quantity,
        weight: CurrentProduct.weight,
        serves: CurrentProduct.serves,
        category: CurrentProduct.category,
        price: quantity * CurrentProduct.price,
      }
      //   dispatch(addCartProduct([info]))
      dispatch(ToggleCart())
    } else {
      //   dispatch(UpdateItem(Number(CurrentProduct.id), quantity))
      dispatch(ToggleCart())
    }
  }

  const handleChange = e => {
    setQuantity(parseInt(selectRef.current.value))
  }
  const CartProducts = () => {
    if (cart.CartLoading) {
      return <div>Loading</div>
    } else {
      return (
        <div className={styles.container}>
          <Img className={styles.productFlexImage} src={data.src} />
          {/* <BuyImage
              category={CurrentProduct.category}
              title={CurrentProduct.title}
            /> */}
          <div className={styles.productFlexInfo}>
            <div className={styles.card} style={{ width: "100%" }}>
              <React.Fragment>
                <div className={styles.cardHeader}>
                  <h5 className={styles.cardTitle}>{data.title}</h5>
                </div>
                <p>{data.description}</p>
                <div className={styles.flexColMd}>
                  <p>
                    <b style={{ color: "#f9090a" }}>
                      MRP: ₹
                      {((quantity * data.price) / data.minimumWeight).toFixed(
                        2
                      )}
                    </b>{" "}
                  </p>
                  <p>
                    <b>Net: {data.weight} kg</b>{" "}
                  </p>
                </div>

                <div className={styles.productAddForm}>
                  <form onSubmit={() => handleSubmit()}>
                    <label for="weight">Net Weight</label>
                    <select
                      onChange={e => handleChange(e)}
                      ref={selectRef}
                      name="weight"
                      id="weight"
                      value={quantity}
                    >
                      <option value="3">3kg</option>
                      <option value="4">4kg</option>
                      <option value="5">5kg</option>
                      <option value="6">6kg</option>
                    </select>
                    <br />
                    <br />
                    <SubmitButton />
                  </form>
                </div>
              </React.Fragment>
            </div>
          </div>
        </div>
      )
    }
  }

  return <CartProducts />
}
