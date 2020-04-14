import React from "react"
import { graphql, StaticQuery } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout"
import Post from "../components/Post"
const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Home page</h1>
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
              />
            )
          })}
        </div>
      )}
    />
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
          }
          excerpt
        }
      }
    }
  }
`

export default IndexPage
