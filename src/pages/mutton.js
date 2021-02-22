import React from "react"
import Buy from "../components/Buy"
import Layout from "../components/layout"

function mutton() {

    var data = {
        id:1,
        title: "Mutton Biryani",
        basePrice: 200,
        description: "This is the mutton biryani",
        minimumWeight:3,
        src:"mutton",
        link:"/mutton"
      }
  return (
      <Layout title="mutton biryani">
         <Buy data={data} />
      </Layout>
    
  )
}

export default mutton
