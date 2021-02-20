import { Get_Product_start, Get_Product_Success, Get_Product_Fail } from '../actions/types'

const initialState = {
    products: [],
    productLoading: false,
    productError: '',
    tax: 0
}

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case Get_Product_start:
            return {
                ...state, productLoading: true
            }
        case Get_Product_Success:
            return {
                productLoading: false,
                products: action.payload.Products,
                productError: '',
                tax: action.payload.TAX
            }
        case Get_Product_Fail:
            return {
                ...state,
                products: [],
                productError: action.payload,
                productLoading: false
            }

        default: return state
    }

}
export default ProductReducer