import {
    AUTH_START, AUTH_FAIL, AUTH_SUCCESS, AUTH_LOGOUT, OTP_Start,
    OTP_Success, OTP_Fail, GET_TRANSACTION_STATUS_START, GET_TRANSACTION_STATUS_SUCCESS,
    GET_TRANSACTION_STATUS_FAIL
} from './types'
import axios from 'axios'
import { loginCopyCart } from './CartActions'
import { getAddressSuccess, getDeliveryAddress } from './AddressActions'
import { getItem, setItem, removeItem } from '../../components/LocalStorage'


export const authStart = () => {
    return {
        type: AUTH_START,
        payload: "START AUTHORIZATION"
    }
}
export const authSuccess = (info) => {
    return {
        type: AUTH_SUCCESS,
        payload: info
    }
}
export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        payload: error
    }
}

export const OTPStart = () => {
    return {
        type: OTP_Start
    }
}
export const OTPSuccess = (res) => {
    return {
        type: OTP_Success,
        payload: res
    }
}
export const OTPFail = (error) => {
    return {
        type: OTP_Fail,
        payload: error
    }
}

export const logout = () => {
    removeItem('token');
    removeItem(('expirationDate'))
    removeItem('addressList')
    removeItem('username')
    removeItem('name')
    removeItem('email')
    
    // window.location.reload();
    return {
        type: AUTH_LOGOUT,
        payload: 'Logout'
    }
}


export const getTransactionStatusStart = () => {
    return {
        type: GET_TRANSACTION_STATUS_START,
    }
}
export const getTransactionStatusSuccess = (info) => {
    return {
        type: GET_TRANSACTION_STATUS_SUCCESS,
        payload: info
    }
}
export const getTransactionStatusFail = (error) => {
    return {
        type: GET_TRANSACTION_STATUS_FAIL,
        payload: error
    }
}


const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}


export const signUpOTP = (username, name) => {
    return dispatch => {
        dispatch(OTPStart())
        axios.post(`${process.env.REACT_APP_BASE_URL}api/signup/`, {
            username: username,
            name: name
        })
            .then(response => {
                dispatch(OTPSuccess(response.data))
            })
            .catch(error => {
                try {
                    dispatch(OTPFail(error.response.data.detail))
                }
                catch {
                    dispatch(OTPFail(error.message))
                }
            })
    }
}


export const signUpOTPVerify = (username, otp, email) => {
    return dispatch => {
        dispatch(authStart())
        axios.post(`${process.env.REACT_APP_BASE_URL}api/signupverify/`, {
            username: username,
            email: email,
            OTP: otp
        })
            .then(response => {
                const token = response.data.key;
                const name = response.data.name;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000); //1hour
                setItem('token', token);
                setItem('name', name);
                setItem('username', username);
                setItem('email', email);
                setItem('expirationDate', expirationDate);
                dispatch(GetTransactionStatus(token))
                dispatch(authSuccess({ token: token, name: name, username: username, email: email })); //send token to the authSUccess
                dispatch(loginCopyCart())
                dispatch(checkAuthTimeout(3600));
            })
            .catch(error => {
                try {
                    dispatch(authFail(error.response.data.detail))
                }
                catch {
                    dispatch(authFail(error.message))
                }

            })
    }
}

export const LoginOTP = (username) => {
    return dispatch => {
        dispatch(OTPStart())
        axios.post(`${process.env.REACT_APP_BASE_URL}api/login/`, {
            username: username
        })
            .then(response => {
                dispatch(OTPSuccess(response.data))
            })
            .catch(error => {
                try {
                    dispatch(OTPFail(error.response.data.detail))
                }
                catch {
                    dispatch(OTPFail(error.message))
                }
            })
    }
}


export const LoginOTPVerify = (username, otp) => {
    return dispatch => {
        dispatch(authStart())
        axios.post(`${process.env.REACT_APP_BASE_URL}api/loginverify/`, {
            username: username,
            OTP: otp
        })
            .then(response => {
                const token = response.data.key;
                const name = response.data.name;
                const email = response.data.email;
                const csrftoken = response.data.csrftoken;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000); //1hour

                setItem('token', token);
                setItem('name', name);
                setItem('username', username);
                setItem('email', email);
                setItem('expirationDate', expirationDate);
                dispatch(GetTransactionStatus(token))
                dispatch(authSuccess({ token: token, name: name, username: username, email: email, csrftoken: csrftoken })); //send token to the authSUccess
                dispatch(loginCopyCart())
                dispatch(checkAuthTimeout(3600));
                dispatch(getDeliveryAddress(token));
            })
            .catch(error => {
                try {
                    dispatch(authFail(error.response.data.detail))
                }
                catch {
                    dispatch(authFail(error.message))
                }
                dispatch(authFail(error.response.data.detail || error.message))
            })
    }
}


//Check if Token exists and if it does then its a login or else logout
export const autoCheckState = () => {
    return dispatch => {
        const token = getItem('token')
        const username = getItem('username')
        const name = getItem('name')
        const email = getItem('email')
        const addressList = getItem('addressList', true) //Second Parameter is to Parse
        if (token == undefined) { //if no tooken then logout
            dispatch(logout())
        } else {// if token exists then use this to check expiration date
            const expirationDate = new Date(getItem('expirationDate'))//current expiration date in localstorage
            if (expirationDate <= new Date()) { //if expiration date is over 
                dispatch(logout())
            }
            else {
                dispatch(GetTransactionStatus(token)) //Get the current transaction status.
                dispatch(authSuccess({ token: token, username: username, name: name, email: email }))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
                if (addressList == null || addressList.length == 0) {//if addresslist is not there in local storage fetch from backend
                    dispatch(getDeliveryAddress(token));
                }
                else {//if addresslist is present in localStorage then use the current addressList
                    dispatch(getAddressSuccess(addressList))
                }
            }

        }
    }
}

export const GetTransactionStatus = (token) => {
    return dispatch => {
        dispatch(getTransactionStatusStart())
        axios.get(`${process.env.REACT_APP_BASE_URL}api/transaction/`, {
            headers: {
                'Authorization': `Token ${token}`,
            }
        })
            .then(response => {
                console.log("TRANSACTION STATUS", JSON.parse(response.data.Status), typeof JSON.parse(response.data.Status))
                dispatch(getTransactionStatusSuccess(JSON.parse(response.data.Status)))
            })
            .catch(error => {
                try {
                    dispatch(getTransactionStatusFail(error.response.data.detail))
                }
                catch {
                    dispatch(getTransactionStatusFail(error.message))
                }
            })
    }
}

