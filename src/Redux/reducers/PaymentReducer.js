import {
    GET_PAYMENT_START, GET_PAYMENT_SUCCESS, GET_PAYMENT_FAIL,
    CASH_ON_DELIVERY_START, CASH_ON_DELIVERY_SUCCESS, CASH_ON_DELIVERY_FAIL, AUTH_LOGOUT
} from '../actions/types'


const initialState = {
    PaymentLoading: false,
    PaymentError: null,
    PaymentSuccess: null,
    PaymentForm: "",
    PaymentDetail: "",


}

const PaymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PAYMENT_START:
            return {
                PaymentLoading: true,
                PaymentError: false,
                PaymentSuccess: false,
                PaymentForm: '',
                PaymentDetail: ''
            }
        case GET_PAYMENT_SUCCESS:
            return {
                PaymentLoading: false,
                PaymentError: false,
                PaymentSuccess: true,
                PaymentForm: '',
                PaymentDetail: action.payload
            }
        case GET_PAYMENT_FAIL:
            return {
                PaymentLoading: false,
                PaymentError: action.payload,
                PaymentSuccess: false,
                PaymentForm: '',
                PaymentDetail: ''
            }
        case CASH_ON_DELIVERY_START:
            return {
                PaymentLoading: true,
                PaymentError: false,
                PaymentSuccess: false,
                PaymentForm: '',
                PaymentDetail: ''
            }
        case CASH_ON_DELIVERY_SUCCESS:
            return {
                ...state,
                PaymentLoading: false
            }
        case CASH_ON_DELIVERY_FAIL:
            return {
                ...state,
                PaymentLoading: false,
                PaymentError: action.payload,
            }
        case AUTH_LOGOUT:
            return initialState

        default:
            return state;

    }

}

export default PaymentReducer