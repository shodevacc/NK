
import {
    AUTH_START, AUTH_FAIL, AUTH_SUCCESS, AUTH_LOGOUT
    , OTP_Start, OTP_Success, OTP_Fail,
    GET_TRANSACTION_STATUS_START, GET_TRANSACTION_STATUS_SUCCESS,
    GET_TRANSACTION_STATUS_FAIL
} from '../actions/types'



const initialState = {
    name: '',
    username: '',
    email: '',
    token: null,
    errorMessage: null,
    loading: false,

    OTPLoading: false,
    OTPError: '',
    OTPRes: '',
    OTPOTP: false,

    transactionStatus: false
}

export default function UsersReducer(state = initialState, action) {

    switch (action.type) {
        case AUTH_START:
            return {
                ...state,
                errorMessage: null,
                errorInfo: null,
                loading: true,
            }
        case AUTH_SUCCESS:

            return {
                ...state,
                loading: false,
                errorMessage: null,
                errorInfo: null,
                token: action.payload.token,
                name: action.payload.name,
                username: action.payload.username,
                email: action.payload.email,
            }
        case AUTH_FAIL:

            return {
                ...state,
                errorMessage: action.payload,
                loading: false,

            }
        case AUTH_LOGOUT:
            return initialState

        case OTP_Start:
            return {
                ...state,
                OTPLoading: true
            }

        case OTP_Success:
            return {
                ...state,
                OTPLoading: false,
                OTPRes: action.payload,
                OTPError: null
            }

        case OTP_Fail:
            return {
                ...state,
                OTPLoading: false,
                OTPError: action.payload,
                OTPRes: null
            }


        case GET_TRANSACTION_STATUS_START:
            return {
                ...state,
                loading: true,
            }
        case GET_TRANSACTION_STATUS_SUCCESS:

            return {
                ...state,
                loading: false,
                transactionStatus: action.payload
            }
        case GET_TRANSACTION_STATUS_FAIL:
            return {
                ...state,
                errorMessage: action.payload,
                loading: false,
            }
        default:

            return state;
    }
}
