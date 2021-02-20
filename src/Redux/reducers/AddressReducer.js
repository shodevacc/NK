import {
    CREATE_ADDRESS_START, CREATE_ADDRESS_SUCCESS, CREATE_ADDRESS_FAIL,
    GET_ADDRESS_START, GET_ADDRESS_SUCCESS, GET_ADDRESS_FAIL,
    SET_ADDRESS_START, SET_ADDRESS_SUCCESS, SET_ADDRESS_FAIL,
    DEL_ADDRESS_START, DEL_ADDRESS_SUCCESS, DEL_ADDRESS_FAIL,
    AUTH_LOGOUT
} from '../actions/types'


const initialState = {

    addressLoading: false,
    addressInfo: '',
    addressList: [],
    addressExists: false,
    addressError: '',
    addressAdd: false,
    selectedAddress: null

}

export default function AddressReducer(state = initialState, action) {
    switch (action.type) {

        case GET_ADDRESS_START:
            return {
                ...state,
                addressLoading: true
            }
        case CREATE_ADDRESS_START://Start Address Create
            return {
                ...state,
                addressLoading: true
            }
        case SET_ADDRESS_START:
            return {
                ...state,
                addressLoading: true
            }
        case DEL_ADDRESS_START:
            return state
        case CREATE_ADDRESS_SUCCESS:
            return {
                ...state,
                addressLoading: false,
                addressError: null,
                addressInfo: action.payload,
                addressList: [...state.addressList, action.payload]
            }
        case GET_ADDRESS_SUCCESS:
            return {
                ...state,
                addressError: null,
                addressList: action.payload,
                addressExists: true,
                addressLoading: false
            }
        case SET_ADDRESS_SUCCESS:
            return {
                ...state,
                addressError: null,
                selectedAddress: action.payload,
                addressLoading: false
            }
        case DEL_ADDRESS_SUCCESS:
            return {
                ...state,
                addressError: null,
                addressList: action.payload
            }

        case CREATE_ADDRESS_FAIL:
            return {
                ...state,
                addressLoading: false,
                addressError: action.payload
            }


        case GET_ADDRESS_FAIL:
            return {
                ...state,
                addressLoading: false,
                addressError: action.payload
            }
        case SET_ADDRESS_FAIL:
            return {
                ...state,
                addressLoading: false,
                addressError: action.payload,
                selectedAddress: null,
            }


        case DEL_ADDRESS_FAIL:
            return {
                ...state,
                addressLoading: false,
                addressError: action.payload
            }
        case AUTH_LOGOUT:
            return initialState

        default:
            return state;
    }
}
