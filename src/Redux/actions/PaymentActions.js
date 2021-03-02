import {
    PAYMENT_PROCESS_START,
    PAYMENT_PROCESS_SUCCESS,

} from "./types"

//Accept form data and process the signature and get all the hidden form details
export const PaymentStart = (formData) => {
  return {
    type: PAYMENT_PROCESS_START,
    payload:formData
  }
}
//Dispatch after all values are got
export const PaymentSuccess = () => {
  return {
    type: PAYMENT_PROCESS_SUCCESS
  }
}

// export const GetPaymentFail = error => {
//   return {
//     type: GET_PAYMENT_FAIL,
//     payload: error,
//   }
// }

//Wrap PayemntStart in a Promise to make sure PaymentSuccess is dispacthed only after this guy is done executing
const Process=(formData,dispatch)=>new Promise((resolve,reject)=>{
    dispatch(PaymentStart(formData))
    resolve();
})

export const ProcessPayment=(formData)=>{
    return dispatch=>{
        Process(formData,dispatch).then(()=>{
            //After the processing is done dispatch Success action
            dispatch(PaymentSuccess())
        })
    }
}
