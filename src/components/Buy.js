import React, { useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { AddItem, UpdateItem } from "../Redux/actions/CartActions"
// import { addCartProduct, UpdateItem } from '../Redux/actions/CartActions'
// import { BuyImage } from "../../Images"
import Img from "./BuyImages"
import { ToggleCart } from "../Redux/actions/ToggleCart"
import styles from "../styles/buy.module.css"

export default function Buy({ pk, category, src, data }) {

  const selectRef = useRef(null)
  const cart = useSelector(state => state.cart)
  // const quantity=useState(3)
  const isBrowser=typeof window !== 'undefined'
  const dispatch = useDispatch()
  var addItem = true //Check if whether to update or add item
  //Check if the product is already in the cart
  const FilterCartProduct =isBrowser&& cart.CartProducts.filter(prod => prod.id == data.id)
  // console.log("FILTERED",FilterCartProduct, Array.isArray(cart.CartProducts))
  const CurrentProduct = {
    title: "chicken",
    weight: "500",
    serves: "2",
    price: 10,
    category: "CHICKEN",
  }
  //   const CurrentProduct = product.products.filter(item => item.id == pk)[0]
  var initialState = data.minimumWeight
  if (cart.CartProducts.length > 0 && FilterCartProduct.length > 0) {
    //if product exists in cart
    addItem = false
    initialState = FilterCartProduct[0].weight
  }
  const [weight, setWeight] = useState(initialState)

  const SubmitButton = () => {
    if (FilterCartProduct.length > 0 && weight == FilterCartProduct[0].weight) {
      console.log("ITEMS ARE NOT CHANGED")
      return (
        <button className="logo-red-btn-disabled" type="submit">
          No Changes
        </button>
      )
    } else {
      console.log("ITEMS ARE CHANGED", FilterCartProduct)
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
      //Check if item needs to be updaed or added
      let info = {
        ...data,
        weight: parseInt(weight),
        price: parseInt(
          ((weight * data.basePrice) / data.minimumWeight).toFixed(2)
        ),
      }
      dispatch(AddItem(info))
      //   dispatch(addCartProduct([info]))
      dispatch(ToggleCart())
    } else {
      let info = {
        id: data.id,
        newWeight: weight,
        newPrice: parseInt(
          ((weight * data.basePrice) / data.minimumWeight).toFixed(2)
        ),
      }
      dispatch(UpdateItem(info))
      dispatch(ToggleCart())
    }
  }

  //When new weight is selected
  const handleChange = e => {
    setWeight(parseInt(selectRef.current.value))
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
                      {((weight * data.basePrice) / data.minimumWeight).toFixed(
                        2
                      )}
                    </b>{" "}
                  </p>
                </div>

                <div className={styles.productAddForm}>
                  <form onSubmit={() => handleSubmit()}>
                    <label htmlFor="weight">
                      <b>Net Weight:</b>
                    </label>
                    <select
                      onChange={e => handleChange(e)}
                      ref={selectRef}
                      name="weight"
                      id="weight"
                      value={weight}
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
