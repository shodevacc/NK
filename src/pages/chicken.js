import React from "react"
import Buy from "../components/Buy"
import Layout from "../components/layout"

function chicken() {
  var data = {
    title: "Chicken Biryani",
    price: 100,
    description: "This is the chicken biryani",
    minimumWeight:3,
    src:"chicken"
  }
  return (
    <Layout title="chicken biryani">
      <Buy data={data} />
    </Layout>
  )
}

export default chicken
