import React from "react"
import Buy from "../components/Buy"
import Layout from "../components/layout"

function chicken() {
  var data = {
    id:0,
    title: "Chicken Biryani",
    basePrice: 100,
    description: "This is the chicken biryani",
    minimumWeight:3,
    src:"chicken",
    link:"/chicken"
  }
  return (
    <Layout title="chicken biryani">
      <Buy data={data} />
    </Layout>
  )
}

export default chicken
