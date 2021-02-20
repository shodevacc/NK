import {TOGGLE_CART} from '../actions/types'

const initialState={
    toggle:false
}

const ToggleReducer=(state=initialState,action)=>{
    switch(action.type){
        case TOGGLE_CART:
            return{
                toggle:!state.toggle
            }
        default:return state;
    }
}

export default ToggleReducer