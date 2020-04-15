import React from "react"
import { Card, CardSubtitle, CardBody, Badge } from "reactstrap"

import Img from "gatsby-image"

import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import { slugify } from "../utilityFunction"
import authors from "./authors"

function SinglePost({ data }) {
  const post = data.markdownRemark.frontmatter
  const author = authors.find(x => x.name === post.author)
  return (
    <Layout
      pageTitle={post.title}
      postAuthor={author}
      authorImageFluid={data.file.childImageSharp.fluid}
    >
      <SEO title={post.title} />
      <Card>
        <Img
          className="card-image-top"
          fluid={post.image.childImageSharp.fluid}
        />
        <CardBody>
          <CardSubtitle>
            <span className="text-info">{post.date}</span> by{" "}
            <span className="text-info">{post.author}</span>
          </CardSubtitle>
          <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
          <ul className="post-tags">
            {post.tags.map((tag, index) => (
              <li key={index}>
                <Link to={`/tag/${slugify(tag)}`}>
                  <Badge color="primary" className="text-uppercase">
                    {tag}
                  </Badge>
                </Link>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </Layout>
  )
}

export const postQuery = graphql`
  query singlePostBySlug($slug: String!, $imageUrl: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMM do YYYY")
        author
        tags
        image {
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid
            }
          }
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

export default SinglePost
