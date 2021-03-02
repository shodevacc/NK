import { combineReducers } from 'redux';
import PaymentReducer from './PaymentReducer'
import ProductReducer from './ProductReducer'
import UserReducer from './UserReducer'
import AddressReducer from './AddressReducer'
import CartReducer from './CartReducer'
import GetFormReducer from './GetFormReducer'
import ToggleReducer from './ToggleCartReducer'

export default combineReducers({
    payment:PaymentReducer,
    products:ProductReducer,
    user:UserReducer,
    address:AddressReducer,
    cart:CartReducer,
    togglecart:ToggleReducer,
    form:GetFormReducer
}
);