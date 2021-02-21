import React from "react"
import Buy from "../components/Buy"
import Layout from "../components/layout"

function mutton() {
    var data = {
        title: "Mutton Biryani",
        price: 100,
        description: "This is the mutton biryani",
        minimumWeight:3,
        src:"mutton"
      }
  return (
      <Layout title="mutton biryani">
         <Buy data={data} />
      </Layout>
    
  )
}

export default mutton
