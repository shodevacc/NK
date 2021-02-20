import React from "react"
import Showcase from "../components/Showcase"
import Products from "../components/Products"
import About from "../components/About"
import Nav from "../components/Nav"
import store from "../Redux/store"
import { Provider } from "react-redux"
// import Images from '../components/HomeImages'
import chicken from "../images/chicken.png"
import mutton from "../images/mutton.png"
import ProductCard from "../components/ProductCard"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
  const products = {
    chicken: {
      title: "Biryani",
      info: "Chicken",
      price: "100",
      src: "chicken",
      link: "/chicken",
      num:0
    },
    mutton: {
      title: "Biryani",
      info: "mutton",
      price: "100",
      src: "mutton",
      link: "/mutton",
      num:1
    },
  }
  return (
    <Provider store={store}>
      <div>
        <SEO title="Home" />
        <p id="alert">**We Currently Only deliver in Bangalore**</p>
        <Nav />
        <Showcase />
        <ProductCard productInfo={products.chicken} />
        <ProductCard productInfo={products.mutton} />
        {/* <Products products={products} /> */}
        <About />
        {/* <Images/> */}
        {/* <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link> */}
      </div>
    </Provider>
  )
}
export default IndexPage
