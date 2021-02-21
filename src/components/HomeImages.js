import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Carticon from "../SVG/Carticon.svg"
import EmptyCarticon from "../SVG/Emptycart.svg"

const Image = ({ className, src, id, style, reference }) => {
  const data = useStaticQuery(graphql`
    query {
      HomeImages: allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          relativeDirectory: { eq: "Home" }
        }
      ) {
        edges {
          node {
            name
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)
  const filteredData = {}
  data.HomeImages.edges.forEach(edge => {
    filteredData[edge.node.name] = edge.node.childImageSharp.fluid
  })
  for (const key in filteredData) {
    // console.log(src, key)
    if (src == key) {
      return (
        <Img
          ref={reference}
          style={style}
          id={id}
          className={className}
          fluid={filteredData[key]}
        />
      )
    }
  }
  console.log("NOT FOUND")
  return <div></div>
}

export const Close = ({ color, width, height, style }) => (
  <svg
    alt="Close"
    style={{ ...style }}
    fill={`${color}`}
    width={width || "1em"}
    height={height || "1em"}
    viewBox="0 0 16 16"
    id="toggle-cart"
    className="bi bi-x-circle-fill"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
    />
  </svg>
)
export const CartIcon = ({ width, height }) => (
  <img
    alt="Cart"
    style={{ width: width || "1rem", height: height || "1rem" }}
    src={Carticon}
  />
)

export const EmptyCart = ({ width, height, color }) => (
  <img
    alt=""
    style={{ width: width || "1rem", height: height || "1rem", color: color }}
    src={EmptyCarticon}
  />
)

export default Image
