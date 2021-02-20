import {
    GET_PAYMENT_START, GET_PAYMENT_SUCCESS, GET_PAYMENT_FAIL,
    CASH_ON_DELIVERY_START, CASH_ON_DELIVERY_SUCCESS, CASH_ON_DELIVERY_FAIL
} from './types'

import axios from 'axios'

export const GetPaymentStart = () => {
    return {
        type: GET_PAYMENT_START
    }
}
export const GetPaymentSuccess = (details) => {
    return {
        type: GET_PAYMENT_SUCCESS,
        payload: details
    }
}

export const GetPaymentFail = (error) => {
    return {
        type: GET_PAYMENT_FAIL,
        payload: error
    }
}
export const CashOnDeliveryStart = () => {
    return {
        type: CASH_ON_DELIVERY_START
    }
}
export const CashOnDeliverySuccess = () => {
    return {
        type: CASH_ON_DELIVERY_SUCCESS
    }
}
export const CashOnDeliveryFail = () => {
    return {
        type: CASH_ON_DELIVERY_FAIL
    }
}

export const GetPaymentInfo = (token) => {
    return dispatch => {
        dispatch(GetPaymentStart())
        axios.post(`${process.env.REACT_APP_BASE_URL}api/checkoutform/`, {}, {
            headers: {
                'Authorization': `Token ${token}`,
            }
        })
            .then(response => {
                dispatch(GetPaymentSuccess(response.data))
            })
            .catch(error => {
                dispatch(GetPaymentFail(error.message))
            })
    }
}

export const CashOnDelivery = (token) => {
    return dispatch => {
        dispatch(CashOnDeliveryStart())
        axios.post(`${process.env.REACT_APP_BASE_URL}api/COD/`, {}, {
            headers: {
                'Authorization': `Token ${token}`,
            }
        })
            .then(response => {
                dispatch(CashOnDeliverySuccess(response.data));
                window.location.replace("/paymentdone/");
            })
            .catch(error => {
                dispatch(CashOnDeliveryFail(error.message))
                window.location.href="/paymentdone/";
            })
    }
}

