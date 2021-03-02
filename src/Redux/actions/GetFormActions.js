import { GetForm_Start, GetForm_Success, GetForm_Fail } from "./types"
import axios from "axios"
// import msg91 from 'msg91-node-v2'

//Accept form data and process the signature and get all the hidden form details
export const GetFormStart = () => {
  return {
    type: GetForm_Start,
  }
}
//Dispatch after all values are got
export const GetFormSuccess = () => {
  return {
    type: GetForm_Success,
  }
}

export const GetFormFail = error => {
  return {
    type: GetForm_Fail,
    payload: error,
  }
}

export const SendForm = () => {
  // const msg=new MSG91('339801AsT2c6iC5f43fd30P1');
  var flowId="5f4601b5d6fc0513c5259478";
  var authKey="339801AsT2c6iC5f43fd30P1";
  var senderId="FromAPI";
  var message="Hi,1234 is your verification code. Thanks for using Biryani Royale. Please use this to confirm your account."
  var payload = {
    "sender": "SOCKET",
    "route": "4",
    "country": "91",
    "unicode": "1",
    "sms": [
      {
        "message": message,
        "to": [
          "9008500002"
        ]
      }
    ]
  }
//  payload=JSON.stringify(payload)
var headers = {
  'authkey': authKey,
  'content-type': "application/json"

}
  return dispatch => {
    dispatch(GetFormStart())
    axios
      .post(
        `https://sokt.io/app/yReXshxaGZ6WANVx3a5P/sample-endpoint`,
          payload,
        {
          headers: headers,
        }
      )
      .then(response => {
        console.log("RESPONSE", response, response.data)
        dispatch(GetFormSuccess())
      })
      .catch(error => {
        console.log("error", error, error.message)
        dispatch(GetFormFail(error.message))
      })
  }

  
}
