import React, { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"

import styles from "../styles/checkout.module.css"
import * as Yup from "yup"

import CartList from "../components/CartList"

import { useDispatch, useSelector } from "react-redux"
import { ProcessPayment } from "../Redux/actions/PaymentActions"
import { SendForm } from "../Redux/actions/GetFormActions"

function CashFree() {
  const [deliveryInfo, setDeliveryInfo] = useState({
    today: false,
    accepting: true,
  })
  const paymentState = useSelector(state => state.payment)
  const formState = useSelector(state => state.form)
  const dispatch = useDispatch()
  if (paymentState.Redirect) {
    document.querySelector("#redirectForm").submit()
  }
  function checkDate(date) {
    if (date == undefined) {
      return false
    }
    console.log("THE VALUE IS", date)
    var d = new Date() //Current Date
    var d1 = new Date(date) //Form date
    var currentDate = {
      year: d.getFullYear(),
      month: d.getMonth(),
      day: d.getDate(),
      time: d.getTime(), //Time in milliseconds
      minutes: parseInt(d.getHours() * 60) + parseInt(d.getMinutes()),
    }
    var formDate = {
      year: d1.getFullYear(),
      month: d1.getMonth(),
      day: d1.getDate(),
      time: d1.getTime(),
    }
    if (formDate.time > currentDate.time) {
      console.log("FUTURE DATE")
      setDeliveryInfo(state => {
        return { ...state, today: false }
      })
      return true
    } else if (
      formDate.year == currentDate.year &&
      formDate.month == currentDate.month &&
      formDate.day == currentDate.day
    ) {
      console.log("TODAY")
      setDeliveryInfo(state => {
        return { ...state, today: true }
      })
      return true
    } else {
      setDeliveryInfo(state => {
        return { ...state, today: false }
      })
      console.log("PAST DATE")
      return false
    }
  }
  const GetCurrentTime = () => {
    var today = new Date() //Todays date
    return parseInt(today.getHours() * 60) + parseInt(today.getMinutes()) //Current time in minutes from 12am
  }
  function checkTodayAccepting(time) {
    if (deliveryInfo.today && time != undefined) {
      var currentTime = GetCurrentTime()
      var lastAcceptingTime = 15 * 60 //3pm
      if (currentTime > lastAcceptingTime) {
        setDeliveryInfo(state => {
          return { ...state, accepting: false }
        })
        return false
      } else {
        setDeliveryInfo(state => {
          return { ...state, accepting: true }
        })
        return true
      }
    }
    //If today is not selected
    else {
      return true
    }
  }
  function checkTodayTime(time) {
    if (deliveryInfo.today && deliveryInfo.accepting && time != undefined) {
      var TimetoPrepare = 6 * 60 //Time needed to prepare biryani (6hours)
      var currentTime = GetCurrentTime()
      //Check if 6 hours are available to make the delivery
      var timeSelected = getSelectedTime(time) //Time selected for delivery
      var workingHours = timeSelected - currentTime //Time we get to preapre the biryani depending upon users selection
      if (TimetoPrepare <= workingHours) {
        return true
      } else {
        return false
      }
    }
    //If delivery is not for today then don't need to check 6hours
    else {
      return true
    }
  }
  //Check if the selected delivery time is between set delivery times
  function checkTomorrowTime(time) {
    //Check for tomorrow only if delivery date is not today
    if (!deliveryInfo.today && time != undefined) {
      var deliveryStart = 14 * 60 //2pm in minutes from 12am
      var deliveryStop = 21 * 60 //9pm in minutes from 12am
      var timeSelected = getSelectedTime(time) //Get the selected delibery time
      if (timeSelected >= deliveryStart && timeSelected <= deliveryStop) {
        //It is possible to delivery
        return true
      } else {
        //It is not possible to delivery
        return false
      }
    }
    //return true if delivery date is today
    else {
      return true
    }
  }

  //Parse the input field time and convert it into minutes from 12am
  const getSelectedTime = time => {
    var hours = ""
    var minutes = ""
    var hoursDone = false
    for (let i = 0; i < time.length; i++) {
      if (hoursDone) {
        minutes += time[i]
      }
      if (time[i] === ":") {
        hoursDone = true
        continue
      }
      if (!hoursDone) {
        hours += time[i]
      }
    }
    return parseInt(hours) * 60 + parseInt(minutes)
  }
  const Validation = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid Email").required("Required"),
    Pnumber: Yup.string()
      .required("Required")
      .min(10)
      .max(10)
      .matches(/^\d+$/, "Phone number is not valid"),
    date: Yup.string()
      .required("Required")
      .test("checkDate", "Cannot input past date", checkDate)
      .test(
        "checkTodayAccepting",
        "We are not accepting orders for today! Please select a different date",
        checkTodayAccepting
      ),
    time: Yup.string()
      .required("Required")
      .test(
        "checkTodayTime",
        `SELECT FASTEST DELIVERY BY ${
          new Date().getHours() + 6
        }:${new Date().getMinutes()}`,
        checkTodayTime
      )
      .test(
        "checkTomorrowTime",
        "Our delivery timings are from 2pm to 9pm",
        checkTomorrowTime
      ),
    Add1: Yup.string().required("Required"),
    landMark: Yup.string().required("Required"),
  })
  const handleSubmit = (values, setSubmitting) => {
    // Get the data from the Formik form and put it into the format requried
    const formData = {
      orderId: "orderId",
      orderNote: "Expect a call from our personelle",
      customerName: values.firstName + " " + values.lastName,
      customerPhone: values.Pnumber,
      customerEmail: values.email,
      orderCurrency: "INR",
      orderAmount: "10",
      returnUrl:
        "https://stackoverflow.com/questions/46263896/javascript-cryptojs-is-not-defined",
      notifyUrl: "",
      // Not needed for Cashfree
      Add1: values.Add1,
      Add2: values.Add2,
      Add3: values.Add3,
      landmark: values.landmark,
    }
    dispatch(ProcessPayment())
    setSubmitting(false)
  }

  const handleGetForm = () => {
    dispatch(SendForm())
  }
  return (
    <React.Fragment>
      <div className={styles.container}>
        {/* Formik Checkout form */}
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            Pnumber: "",
            Add1: "",
            Add2: "",
            Add3: "",
            landMark: "",
            date: "",
            time: "",
          }}
          validationSchema={Validation}
          onSubmit={(values, { setSubmitting }) =>
            handleSubmit(values, setSubmitting)
          }
        >
          {({ isSubmitting }) => {
            return (
              <Form className={styles.form}>
                <div className={styles.formRow}>
                  <div>
                    <label className={styles.formLabel} htmlFor="firstName">
                      First Name
                    </label>
                    <Field
                      className={styles.formField}
                      placeholder="Jane"
                      type="text"
                      name="firstName"
                    />
                    <ErrorMessage
                      className={styles.formError}
                      name="firstName"
                      component="div"
                    />
                  </div>
                  <div>
                    <label className={styles.formLabel} htmlFor="lastName">
                      Last Name
                    </label>
                    <Field
                      className={styles.formField}
                      placeholder="Doe"
                      type="text"
                      name="lastName"
                    />
                    <ErrorMessage
                      className={styles.formError}
                      name="lastName"
                      component="div"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div>
                    <label className={styles.formLabel} htmlFor="Pnumber">
                      Phone Number
                    </label>
                    <Field
                      className={styles.formField}
                      placeholder="9008755620"
                      type="text"
                      name="Pnumber"
                    />
                    <ErrorMessage
                      className={styles.formError}
                      name="Pnumber"
                      component="div"
                    />
                  </div>

                  <div>
                    <label className={styles.formLabel} htmlFor="email">
                      Email
                    </label>
                    <Field
                      className={styles.formField}
                      placeholder="jane@example.com"
                      type="email"
                      name="email"
                    />
                    <ErrorMessage
                      className={styles.formError}
                      name="email"
                      component="div"
                    />
                  </div>
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="Add1">
                    Address Line 1
                  </label>
                  <Field
                    className={styles.formField}
                    placeholder="Second floor, Example apartment"
                    type="text"
                    name="Add1"
                  />
                  <ErrorMessage
                    className={styles.formError}
                    name="Add1"
                    component="div"
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="Add2">
                    Address Line 2
                  </label>
                  <Field
                    className={styles.formField}
                    placeholder="#2 hutchins road"
                    type="text"
                    name="Add2"
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="Add3">
                    Address Line 3
                  </label>
                  <Field
                    className={styles.formField}
                    placeholder="Cox town"
                    type="text"
                    name="Add3"
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="landMark">
                    Landmark
                  </label>
                  <Field
                    className={styles.formField}
                    placeholder="Opposite Mantri Square"
                    type="text"
                    name="landMark"
                  />
                  <ErrorMessage
                    className={styles.formError}
                    name="landMark"
                    component="div"
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="date">
                    Delivery Date
                  </label>
                  <Field
                    className={styles.formField}
                    placeholder="Opposite Mantri Square"
                    type="date"
                    name="date"
                  />
                  <ErrorMessage
                    className={styles.formError}
                    name="date"
                    component="div"
                  />
                </div>

                <div className={styles.inputContainer}>
                  <label className={styles.formLabel} htmlFor="time">
                    Delivery Time
                  </label>
                  <Field
                    className={styles.formField}
                    placeholder="Opposite Mantri Square"
                    type="time"
                    name="time"
                  />
                  <ErrorMessage
                    className={styles.formError}
                    name="time"
                    component="div"
                  />
                </div>

                <button className={styles.button} type="submit">
                  Submit
                </button>
              </Form>
            )
          }}
        </Formik>
        <div className={styles.cart}>
          <CartList hideCheckout={true}/>
        </div>
      </div>

      {/* CashFree Checkout Form */}
      {paymentState.loading ? <div>Loading</div> : <div>Not Loading</div>}
      <form
        id="redirectForm"
        method="post"
        action="https://test.cashfree.com/billpay/checkout/post/submit"
      >
        <input
          type="hidden"
          name="appId"
          value={paymentState.PaymentDetail.appId}
        />
        <input
          type="hidden"
          name="orderId"
          value={paymentState.PaymentDetail.orderId}
        />
        <input
          type="hidden"
          name="orderAmount"
          value={paymentState.PaymentDetail.orderAmount}
        />
        <input
          type="hidden"
          name="orderCurrency"
          value={paymentState.PaymentDetail.orderCurrency}
        />
        <input
          type="hidden"
          name="orderNote"
          value={paymentState.PaymentDetail.orderNote}
        />
        <input
          type="hidden"
          name="customerName"
          value={paymentState.PaymentDetail.customerName}
        />
        <input
          type="hidden"
          name="customerEmail"
          value={paymentState.PaymentDetail.customerEmail}
        />
        <input
          type="hidden"
          name="customerPhone"
          value={paymentState.PaymentDetail.customerPhone}
        />
        <input
          type="hidden"
          name="returnUrl"
          value={paymentState.PaymentDetail.returnUrl}
        />
        <input
          type="hidden"
          name="notifyUrl"
          value={paymentState.PaymentDetail.notifyUrl}
        />
        <input
          type="hidden"
          name="signature"
          value={paymentState.PaymentDetail.signature}
        />
      </form>
      {formState.error ? (
        <div>ERROR</div>
      ) : formState.loading ? (
        <div>LOading</div>
      ) : (
        <div>Not loading</div>
      )}
      <button onClick={handleGetForm}>GET FORM</button>
      {/* CashFree Checkout Form */}
    </React.Fragment>
  )
}

export default CashFree
