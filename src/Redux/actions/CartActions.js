import { ADD_ITEM, DEL_ITEM, UPDATE_ITEM } from "./types"

export const AddItem = info => {
  // storeCart();
  return {
    type: ADD_ITEM,
    payload: info,
  }
}
export const DelItem = id => {
  return {
    type: DEL_ITEM,
    payload: id,
  }
}
export const UpdateItem = info => {
  // storeCart();
  return {
    type: UPDATE_ITEM,
    payload: info,
  }
}
