import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = ({ className, src, id, style, reference }) => {
  const data = useStaticQuery(graphql`
    query {
      HomeImages: allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          relativeDirectory: { eq: "Buy" }
        }
      ) {
        edges {
          node {
            name
            childImageSharp {
              fluid {
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
  return <div></div>
}

export default Image