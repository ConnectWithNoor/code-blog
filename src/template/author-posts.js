import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout"
import Post from "../components/Post"
import authors from "../template/authors"

function AuthorPost({ data, pageContext }) {
  const totalCount = data.allMarkdownRemark.totalCount
  const author = authors.find(x => x.name === pageContext.authorName)
  const pageHeader = `${totalCount} Posts By ${author.name}`

  return (
    <Layout
      pageTitle={pageHeader}
      postAuthor={author}
      authorImageFluid={data.file.childImageSharp.fluid}
    >
      <SEO title={pageHeader} />
      {data.allMarkdownRemark.edges.map(({ node }) => (
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
      ))}
    </Layout>
  )
}

export const AUTHOR_QUERY = graphql`
  query($authorName: String!, $imageUrl: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { author: { eq: $authorName } } }
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
                fluid(maxWidth: 650) {
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
    file(relativePath: { eq: $imageUrl }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default AuthorPost
