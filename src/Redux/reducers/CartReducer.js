import {
  setItem,
  getItem,
  checkItem,
  removeItem,
} from "../../components/LocalStorage"
import { ADD_ITEM, DEL_ITEM, UPDATE_ITEM } from "../actions/types"

const products = () => {
  if (checkItem("CartProducts")) {
    // console.log("CHECKING ITEMS TRUE")
    //Check if CartProducts are in localstorage
    return getItem("CartProducts", true) //If true return the CartPRoducts
  } else {
    return [] //Else return empty
  }
}

const storeCart = (key, value) => {
  //Store cartProducts in localstorage
  // console.log("STORING", key, value)
  setItem(key, JSON.stringify(value))
}

const initialState = {
  CartError: null,
  CartLoading: false,
  CartProducts: products(),
}

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      // console.log("Add item", action.payload)
      let newProductList = [...state.CartProducts, action.payload]
      storeCart("CartProducts", newProductList)
      return {
        CartLoading: false,
        CartError: null,
        CartProducts: newProductList,
      }
    case DEL_ITEM:
      let delProductList = state.CartProducts.filter(
        item => item.id != action.payload
      )
      storeCart("CartProducts", delProductList)
      return {
        CartProducts: delProductList,
        CartLoading: false,
        CartError: null,
      }
    case UPDATE_ITEM:
      let updatedProductList = state.CartProducts.map(item => {
        //If the item to be updated is found
        if (item.id == action.payload.id) {
          return {
            ...item,
            weight: action.payload.newWeight, //Update its quantity
            price: action.payload.newPrice, //Update its price
          }
        } else {
          //If it is some other item then simply return the item unchanged
          return item
        }
      })
      //   console.log("UPDATING",updatedProductList)
      storeCart("CartProducts", updatedProductList)
      return {
        CartLoading: false,
        CartError: null,
        CartProducts: updatedProductList,
      }

    default:
      return state
  }
}

export default CartReducer
