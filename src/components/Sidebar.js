import React from "react"
import { Card, CardTitle, CardBody, Form, FormGroup, Input } from "reactstrap"

import { graphql, StaticQuery, Link } from "gatsby"
import Img from "gatsby-image"

function Sidebar() {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle className="text-center text-uppercase mb-3">
            Newsletter
          </CardTitle>
          <Form className="text-center">
            <FormGroup>
              <Input
                type="email"
                name="email"
                placeholder="Your email address here.."
              />
            </FormGroup>
            <button className="btn btn-outline-success text-uppercase">
              Subscribe
            </button>
          </Form>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="text-center text-uppercase">
          <CardTitle>Advertisement</CardTitle>
          <img
            src="https://via.placeholder.com/320x200"
            alt="advert"
            style={{ width: "100%" }}
          />
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle className="text-center text-uppercase mb-3">
            Recent posts
          </CardTitle>
          <StaticQuery
            query={SIDEBAR_QUERY}
            render={data =>
              data.allMarkdownRemark.edges.map(({ node }) => (
                <Card key={node.id}>
                  <Link to={node.fields.slug}>
                    <Img
                      className="card-image-top"
                      fluid={node.frontmatter.image.childImageSharp.fluid}
                    />
                  </Link>
                  <CardBody>
                    <CardTitle>
                      <Link to={node.fields.slug}>
                        {node.frontmatter.title}
                      </Link>
                    </CardTitle>
                  </CardBody>
                </Card>
              ))
            }
          />
        </CardBody>
      </Card>
    </div>
  )
}

const SIDEBAR_QUERY = graphql`
  query sidebarQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default Sidebar
