import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { Row, Col } from "reactstrap"

import SEO from "../components/seo"
import Layout from "../components/layout"
import Post from "../components/Post"
const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Home page</h1>
    <Row>
      <Col md="8">
        <StaticQuery
          query={INDEX_QUERY}
          render={data => (
            <div>
              {data.allMarkdownRemark.edges.map(({ node }) => {
                return (
                  <Post
                    title={node.frontmatter.title}
                    author={node.frontmatter.author}
                    path={node.frontmatter.path}
                    date={node.frontmatter.date}
                    body={node.excerpt}
                    fluid={node.frontmatter.image.childImageSharp.fluid}
                  />
                )
              })}
            </div>
          )}
        />
      </Col>
      <Col md="4">
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        ></div>
      </Col>
    </Row>
  </Layout>
)

const INDEX_QUERY = graphql`
  {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMM do YYYY")
            author
            path
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          excerpt
        }
      }
    }
  }
`

export default IndexPage
