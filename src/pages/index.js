import React from "react"
import { graphql, StaticQuery } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout"
import Post from "../components/Post"
import PaginationLinks from "../components/PaginationLinks"

const IndexPage = props => {
  const postsPerPage = 2
  let numberOfPages

  return (
    <Layout pageTitle="Code Blog">
      <SEO title="Home" />
      <StaticQuery
        query={INDEX_QUERY}
        render={data => {
          numberOfPages = Math.ceil(
            data.allMarkdownRemark.totalCount / postsPerPage
          )
          return (
            <div>
              {data.allMarkdownRemark.edges.map(({ node }) => {
                return (
                  <Post
                    key={node.id}
                    title={node.frontmatter.title}
                    author={node.frontmatter.author}
                    slug={node.fields.slug}
                    date={node.frontmatter.date}
                    body={node.excerpt}
                    fluid={node.frontmatter.image.childImageSharp.fluid}
                    tags={node.frontmatter.tags}
                  />
                )
              })}
              <PaginationLinks currentPage={1} numberofPages={numberOfPages} />
            </div>
          )
        }}
      />
    </Layout>
  )
}
const INDEX_QUERY = graphql`
  {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 2
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMM do YYYY")
            author
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`

export default IndexPage
