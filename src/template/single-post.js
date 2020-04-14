import React from "react"
import { Card, CardSubtitle, CardBody, Badge, Row, Col } from "reactstrap"

import Img from "gatsby-image"

import Layout from "../components/layout"
import Sidebar from "../components/Sidebar"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import { slugify } from "../utilityFunction"

function SinglePost({ data }) {
  const post = data.markdownRemark.frontmatter
  console.log(post)
  return (
    <Layout>
      <SEO title={post.title} />
      <h1>{post.title}</h1>

      <Row>
        <Col md="8">
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
              <div
                dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
              />
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
        </Col>
        <Col md="4">
          <Sidebar />
        </Col>
      </Row>
    </Layout>
  )
}

export const postQuery = graphql`
  query singlePostBySlug($slug: String!) {
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
  }
`

export default SinglePost
