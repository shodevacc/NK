import React from "react"
import Showcase from "../components/Showcase"
import About from "../components/About"

import ProductList from "../components/ProductList"

import Layout from "../components/layout"

const IndexPage = () => {
  const products = {
    chicken: {
      title: "Biryani",
      info: "Chicken",
      price: "100",
      src: "chicken",
      link: "/chicken",
      num: 0,
    },
    mutton: {
      title: "Biryani",
      info: "mutton",
      price: "100",
      src: "mutton",
      link: "/mutton",
      num: 1,
    },
  }
  return (
    <Layout title="Home">
      <Showcase />
      <ProductList products={products} />
      {/* <ProductCard productInfo={products.chicken} />
        <ProductCard productInfo={products.mutton} /> */}
      {/* <Products products={products} /> */}
      <About />
    </Layout>
  )
}
export default IndexPage
