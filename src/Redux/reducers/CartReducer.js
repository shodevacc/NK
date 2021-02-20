import { getItem, checkItem, removeItem } from '../../components/LocalStorage'
import {
    ADD_ITEM_START, ADD_ITEM_SUCCESS, ADD_ITEM_FAIL,
    UPDATE_ITEM_START, UPDATE_ITEM_SUCCESS, UPDATE_ITEM_FAIL,
    DELETE_ITEM_START, DELETE_ITEM_SUCCESS, DELETE_ITEM_FAIL,
    GET_ITEM_START, GET_ITEM_SUCCESS, GET_ITEM_FAIL, EMPTY_CART,AUTH_LOGOUT
} from '../actions/types'

const products = () => {
    if (checkItem("CartProducts")) {
        return (getItem("CartProducts", true))
    }
    else {
        return ([])
    }
}

const initialState = {
    CartError: null,
    CartLoading: false,
    CartProducts: products()

}

const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_SUCCESS:
            const newItem = action.payload[0]
            return {
                CartLoading: false,
                CartError: null,
                CartProducts: [...state.CartProducts, newItem]
            }
        case ADD_ITEM_START:
            return {
                ...state,
                CartLoading: true,
            }
        case ADD_ITEM_FAIL:
            return {
                ...state,
                CartLoading: false,
                CartError: action.payload,
            }
        case UPDATE_ITEM_SUCCESS:
            if (action.payload.quantity > 0) {
                return {
                    CartLoading: false,
                    CartError: null,
                    CartProducts: state.CartProducts.map((item) => {
                        if (item.id == action.payload.id) {
                            return ({ ...item, quantity: action.payload.quantity, price: action.payload.quantity * (item.price / item.quantity) })
                        }
                        else {
                            return item;
                        }

                    })
                }
            }
            else {
                return state
            }

        case UPDATE_ITEM_START:
            return {
                ...state,
                CartLoading: true,
            }
        case UPDATE_ITEM_FAIL:
            return {
                ...state,
                CartLoading: false,
                CartError: action.payload,
            }

        case DELETE_ITEM_START:
            return {
                ...state,
                CartLoading: true,
            }
        case DELETE_ITEM_FAIL:
            return {
                ...state,
                CartLoading: false,
                CartError: action.payload,
            }
        case DELETE_ITEM_SUCCESS:
            return {
                CartProducts: state.CartProducts.filter((item) => item.id != action.payload),
                CartLoading: false,
                CartError: null
            }
        case GET_ITEM_START:
            return {
                ...state,
                CartLoading: true,
            }
        case GET_ITEM_FAIL:
            return {
                ...state,
                CartLoading: false,
                CartError: action.payload,
            }
        case GET_ITEM_SUCCESS:
            return {
                CartError: null,
                CartLoading: false,
                CartProducts: action.payload.map(items => {
                    return {
                        id:items.product.id,
                        title: items.product.title,
                        quantity: items.quantity,
                        weight: items.weight,
                        serves:items.product.serves,
                        category:items.product.category,
                        price:items.price
                    }
                })
            }
        case EMPTY_CART:
            removeItem("CartProducts");
            return {
                ...state,
                CartProducts: []
            }
        
        case AUTH_LOGOUT:
            return initialState

        default: return state

    }
}

export default CartReducer