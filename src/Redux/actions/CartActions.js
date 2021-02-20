
import { setItem,getItem, checkItem } from '../../components/LocalStorage'

import {
    ADD_ITEM_START, ADD_ITEM_SUCCESS, ADD_ITEM_FAIL,
    UPDATE_ITEM_START, UPDATE_ITEM_SUCCESS, UPDATE_ITEM_FAIL,
    DELETE_ITEM_START, DELETE_ITEM_SUCCESS, DELETE_ITEM_FAIL,
    GET_ITEM_START, GET_ITEM_SUCCESS, GET_ITEM_FAIL, EMPTY_CART
} from './types'
import store from '../store'
import axios from 'axios'


export const AddItemStart = () => {
    return ({
        type: ADD_ITEM_START
    })
}
export const AddItemSuccess = (productList) => {
    return ({
        type: ADD_ITEM_SUCCESS,
        payload: productList
    })
}
export const AddItemFail = (error) => {
    return ({
        type: ADD_ITEM_FAIL,
        payload: error
    })
}
export const UPDATEItemStart = () => {
    return ({
        type: UPDATE_ITEM_START
    })
}
export const UPDATEItemSuccess = (id, quantity) => {
    return ({
        type: UPDATE_ITEM_SUCCESS,
        payload: { id: id, quantity: quantity }
    })
}
export const UPDATEItemFail = (error) => {
    return ({
        type: UPDATE_ITEM_FAIL,
        payload: error
    })
}

export const DELETEItemStart = () => {
    return ({
        type: DELETE_ITEM_START
    })
}
export const DELETEItemSuccess = (index) => {
    return ({
        type: DELETE_ITEM_SUCCESS,
        payload: index
    })
}
export const DELETEItemFail = (error) => {
    return ({
        type: DELETE_ITEM_FAIL,
        payload: error
    })
}


export const GETItemStart = () => {
    return ({
        type: GET_ITEM_START
    })
}
export const GETItemSuccess = (productList) => {
    return ({
        type: GET_ITEM_SUCCESS,
        payload: productList
    })
}
export const GETItemFail = (error) => {
    return ({
        type: GET_ITEM_FAIL,
        payload: error
    })
}

export const EmptyCart = () => {
    return {
        type: EMPTY_CART
    }
}

const storeCart=()=>{
    setItem("CartProducts",JSON.stringify(store.getState().cart.CartProducts))
}

// THIS BLOCK COPIES THE CART PRODUCTS TO THE BACKEND AFTER LOGIN 
export const getCartProducts = () => { //fetch from coookies
    if (checkItem("CartProducts",true)) { //second term to check for length of an array
        return (getItem("CartProducts", true))
    }
    else {
        return (false)
    }
}

export const loginCopyCart = () => { // upon login if items are there in the cart then copy them to the backend
    const products = getCartProducts()
    return dispatch => {
        if (products) { //copy the items to the login cart backend
            dispatch(delCartProducts(999, products))
        }
        else {
            //If items exist in my old cart then use them to update my cart on the frontend
            dispatch(getOrderItems())
        }
    }
}

// THIS BLOCK COPIES THE CART PRODUCTS TO THE BACKEND AFTER LOGIN 

export const UpdateItem = (id, quantity) => {
    const token = store.getState().user.token
    return dispatch => {
        dispatch(UPDATEItemStart())
        //Update the backend product with the given id
        if (token && quantity > 0) { //if Signed in update the backend
            axios.put(`${process.env.REACT_APP_BASE_URL}api/orderitem/${id}/`, {
                quantity: quantity
            }, {
                headers: {
                    'Authorization': `Token ${token}`,
                }
            }
            )
                .then(function (response) {
                  
                    dispatch(UPDATEItemSuccess(id, quantity))
                    storeCart()
                })
                .catch(function (error) {
                    try {
                        dispatch(UPDATEItemFail(error.response.data.detail))
                    }
                    catch {
                        dispatch(UPDATEItemFail(error.message))
                    }
                });
        }
        else { //only locally change the state
          
            dispatch(UPDATEItemSuccess(id, quantity))
            storeCart()
        }

    }
}


export const addCartProduct = (productList, index = 0) => { //add to backend
    const token = store.getState().user.token
    return dispatch => {
        dispatch(AddItemStart())
        if (token) {
            axios.post(`${process.env.REACT_APP_BASE_URL}api/orderitem/0/`, productList, {
                headers: {
                    'Authorization': `Token ${token}`,
                }
            }
            )
                .then(function (response) {
                    if (index != 999) {
                       
                        dispatch(AddItemSuccess(productList))
                        storeCart()
                    }
                })
                .catch(function (error) {
                    try {
                        dispatch(AddItemFail(error.response.data.detail))
                    }
                    catch {
                        dispatch(AddItemFail(error.message))
                    }
                });
        }
        else {
           
            dispatch(AddItemSuccess(productList))
            storeCart()
        }
    }
}

export const delCartProducts = (id, products) => {
    const token = store.getState().user.token
    return dispatch => {
        dispatch(DELETEItemStart())
        if (token) {
            axios.delete(`${process.env.REACT_APP_BASE_URL}api/orderitem/${id}/`,
                {
                    headers: {
                        'Authorization': `Token ${token}`,
                    }
                }
            )
                .then(function (response) {
                    if (id == 999) {
                        //upadte the cart after deleting all the backend products
                        //At this point all the backend products are deleted
                        const newProducts = products.map(items => {
                            return (
                                {
                                    id: items.id,
                                    quantity: items.quantity
                                }
                            )
                        })
                        //Now we can copy our cart products to the backend
                        dispatch(addCartProduct(newProducts, 999))//copy products to the backend
                    }
                    //The Backend product/products has been deleted. Now Just update the frontend
                    dispatch(DELETEItemSuccess(id))
                    storeCart()
                })
                .catch(function (error) {
                    try {
                        dispatch(DELETEItemFail(error.response.data.detail))
                    }
                    catch {
                        dispatch(DELETEItemFail(error.message))
                    }

                });
        }
        else {
            //If not logged in just delete the backend product
            dispatch(DELETEItemSuccess(id))
            storeCart()
        }
    }
}

export const getOrderItems = () => { //fetch from backend to update my cart
    const token = store.getState().user.token
    return dispatch => {
        if (token) {
            dispatch(GETItemStart())
            axios.get(`${process.env.REACT_APP_BASE_URL}api/orderitem/0/`,
                {
                    headers: {
                        'Authorization': `Token ${token}`,
                    }
                }
            )
                .then(function (response) {
                    dispatch(GETItemSuccess(response.data))
                    storeCart()
                })
                .catch(function (error) {
                    try {
                        dispatch(GETItemFail(error.response.data.detail))
                    }
                    catch {
                        dispatch(GETItemFail(error.message))
                    }
                });
        }
    }
}
