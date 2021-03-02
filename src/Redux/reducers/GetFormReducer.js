import { GetForm_Start, GetForm_Success, GetForm_Fail } from "../actions/types"

const initialState = {
  loading: false,
  error: null,
  success: false,
}

const GetFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case GetForm_Start:
      return {
        loading: true,
        error: null,
        success: false,
      }
    case GetForm_Success:
      return {
        loading: false,
        error: null,
        success: true,
      }
    case GetForm_Fail:
      return {
        loading: false,
        error: action.payload,
        success: false,
      }

    default:
      return state
  }
}

export default GetFormReducer
