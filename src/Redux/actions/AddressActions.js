import {
    CREATE_ADDRESS_START, CREATE_ADDRESS_SUCCESS, CREATE_ADDRESS_FAIL,
    GET_ADDRESS_START, GET_ADDRESS_SUCCESS, GET_ADDRESS_FAIL,
    SET_ADDRESS_START, SET_ADDRESS_SUCCESS, SET_ADDRESS_FAIL,
    DEL_ADDRESS_START, DEL_ADDRESS_SUCCESS, DEL_ADDRESS_FAIL
} from './types'

import store from '../store'
import axios from 'axios';

const createAddressStart = () => {
    return ({
        type: CREATE_ADDRESS_START
    })
}
const createAddressSuccess = (details) => {
    return ({
        type: CREATE_ADDRESS_SUCCESS,
        payload: details //Tag,Address,landmark and houseNumber
    })
}

const createAddressFail = (error) => { //error message
    return ({
        type: CREATE_ADDRESS_FAIL,
        payload: error
    })
}

export const getAddressStart = () => {
    return {
        type: GET_ADDRESS_START
    }
}

export const getAddressSuccess = (AddressList) => {
    return {
        type: GET_ADDRESS_SUCCESS,
        payload: AddressList
    }
}

const getAddressFail = (error) => {
    return {
        type: GET_ADDRESS_FAIL,
        payload: error
    }
}


export const DELAddressStart = () => {
    return {
        type: DEL_ADDRESS_START
    }
}

export const DELAddressSuccess = (AddressList) => {
    return {
        type: DEL_ADDRESS_SUCCESS,
        payload: AddressList
    }
}

const DELAddressFail = (error) => {
    return {
        type: DEL_ADDRESS_FAIL,
        payload: error
    }
}


export const SETAddressStart = () => {
    return {
        type: SET_ADDRESS_START
    }
}

export const SETAddressSuccess = (AddressList) => {
    return {
        type: SET_ADDRESS_SUCCESS,
        payload: AddressList
    }
}

export const SETAddressFail = (error) => {
    return {
        type: SET_ADDRESS_FAIL,
        payload: error
    }
}




//To Add a Delivery Address

export const createDeliveryAddress = (tag, address, landmark, houseNumber, addInfo, lat, lng) => {
    if (tag.length === 0) {
        tag = 'My Address'
    }
    const token = store.getState().user.token
    return dispatch => {
        dispatch(createAddressStart())
        axios.post(`${process.env.REACT_APP_BASE_URL}api/delivery/0/`, {
            tag: tag,
            address: address,
            landmark: landmark,
            houseNumber: houseNumber,
            addInfo: addInfo,
            lat: lat,
            lng: lng
        }, {
            headers: {
                'Authorization': `Token ${token}`,
            }
        }
        )
            .then(function (response) {
                dispatch(createAddressSuccess(response.data))
            })
            .catch(function (error) {
                try {
                    dispatch(createAddressFail(error.response.data.detail))
                }
                catch {
                    dispatch(createAddressFail(error.message))
                }
            });
    }

}

//To get all the delivery addresses from backend

export const getDeliveryAddress = (token) => {
    return dispatch => {
        dispatch(getAddressStart())
        axios.get(`${process.env.REACT_APP_BASE_URL}api/delivery/0/`, {
            headers: {
                'Authorization': `Token ${token}`,
            }
        }
        )
            .then(function (response) {
                const addressList = response.data
                localStorage.setItem('addressList', JSON.stringify(addressList));
                dispatch(getAddressSuccess(addressList))

            })
            .catch(function (error) {
                try {
                    dispatch(getAddressFail(error.response.data.detail))
                }
                catch {
                    dispatch(getAddressFail(error.message))
                }
            });


    }

}


//To delete delivery addresses from backend

export const delDeliveryAddress = (index) => {
    const token = store.getState().user.token
    const addressList = store.getState().address.addressList
    return dispatch => {
        dispatch(DELAddressStart())

        axios.delete(`${process.env.REACT_APP_BASE_URL}api/delivery/${index}/`, {
            headers: {
                'Authorization': `Token ${token}`,
            }
        }
        )
            .then(function (response) {
                const updatedList = addressList.filter(address => address.id != index)
                dispatch(DELAddressSuccess(updatedList))
                localStorage.setItem('addressList', JSON.stringify(updatedList));
            })
            .catch(function (error) {
                try {
                    dispatch(DELAddressFail(error.response.data.detail));
                }
                catch {
                    dispatch(DELAddressFail(error.message));
                }
            });


    }

}


//select the delivery address in the backend

export const setDeliveryAddress = (index) => {
    const token = store.getState().user.token
    return dispatch => {
        dispatch(SETAddressStart())
        axios.post(`${process.env.REACT_APP_BASE_URL}api/selectDeliveryAddress/${index}/`, {}, {
            headers: {
                'Authorization': `Token ${token}`,
            }
        }
        )
            .then(function (response) {
                dispatch(SETAddressSuccess(response.data))
            })
            .catch(function (error) {
                try {
                    dispatch(SETAddressFail(error.response.data.detail))
                }
                catch {
                    dispatch(SETAddressFail(error.message))
                }
            });

    }

}


