import { Get_Product_start, Get_Product_Success, Get_Product_Fail } from './types'
import axios from 'axios'

const getProductStart = () => {
    return {
        type: Get_Product_start
    }
}

const getProductSuccess = (products) => {
    return {
        type: Get_Product_Success,
        payload: products
    }
}

const getProductFail = (error) => {
    return {
        type: Get_Product_Fail,
        payload: error
    }
}

export const fetchProduct = () => {
    return (dispatch) => {
        dispatch(getProductStart())
        axios.get(`${process.env.REACT_APP_BASE_URL}api/`)
            .then(response => {
                dispatch(getProductSuccess(response.data))
            })
            .catch(error => {
                try {
                    dispatch(getProductFail(error.response.data.detail))
                }
                catch {
                    dispatch(getProductFail(error.message))
                }
            })
    }
}
