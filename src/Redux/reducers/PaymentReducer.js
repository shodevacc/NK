import {
  PAYMENT_PROCESS_START,
  PAYMENT_PROCESS_SUCCESS,
} from "../actions/types"
import CryptoJS from "crypto-js"

const initialState = {
  loading: false,
  Processing: true,
  PaymentError: null,
  PaymentSuccess: null,
  PaymentForm: "",
  PaymentDetail: {},
  Redirect: false,
}

const generateSignature = formData => {
  const secretKey = "97c40255b3ea59f9d7b1d30cb875991765522a48"
  const appId = "358078f126711241f745bcf9670853"
  formData["appId"] = appId
  //Filter Data needed for Cashfree
  const FilteredData = {
    appId:formData.appId,
    orderId: formData.orderId,
    orderNote: formData.orderNote,
    customerName: formData.customerName,
    customerPhone: formData.customerPhone,
    customerEmail: formData.customerEmail,
    orderCurrency: formData.orderCurrency,
    orderAmount: formData.orderAmount,
    returnUrl: formData.returnUrl,
    notifyUrl: formData.notifyUrl,
  }
 
  const sortedkeys = Object.keys(FilteredData)
  //Sort the keys
  sortedkeys.sort()
  var signatureData = ""
  var key
  //Generate the signatureData
  for (let i = 0; i < sortedkeys.length; i++) {
    //Get the key
    key = sortedkeys[i]
    signatureData += key + FilteredData[key]
  }
  //Get the signature
  var signature = CryptoJS.HmacSHA256(signatureData, secretKey).toString(
    CryptoJS.enc.Base64
  )
  return signature
}

const PaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_PROCESS_START:
      //Get the signature
      var signature = generateSignature(action.payload)
      return {
        Redirect: false,
        loading: true,
        PaymentDetail: { ...action.payload, signature: signature },
      }
    case PAYMENT_PROCESS_SUCCESS:
      return {
        ...state,
        loading: false,
        Redirect: true,
      }
    // case GET_PAYMENT_FAIL:
    //   return {
    //     loading: false,
    //     PaymentError: action.payload,
    //     PaymentSuccess: false,
    //     PaymentForm: "",
    //     PaymentDetail: "",
    //   }

    default:
      return state
  }
}

export default PaymentReducer
