/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
// Redux
import store from "../Redux/store"
import { Provider } from "react-redux"

import Nav from "./Nav"
import Footer from "./Footer"
import SEO from "./seo"
import Header from "./header"
// import "./layout.css"

const Layout = ({ children,title }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Provider store={store}>
       <SEO title={title} />
       <p style={{ color: "red", textAlign: "center" }} id="alert">
        **We Currently Only deliver in Bangalore**
      </p>
      <Nav />
      {children}
      <Footer />
    </Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
