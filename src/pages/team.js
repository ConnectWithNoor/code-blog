import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { Row, Card, CardBody, CardTitle, CardText, Button } from "reactstrap"
import authors from "../template/authors"
import JohnImage from "../images/john.jpg"
import NoorImage from "../images/noor.jpg"
import { slugify } from "../utilityFunction"

const Team = () => (
  <Layout pageTitle="Our Team">
    <SEO title="Team" />
    <Row>
      <div className="col-md-3">
        <img src={NoorImage} style={{ maxWidth: "100%" }} alt="Noor profile" />
      </div>
      <div className="col-md-8">
        <Card style={{ minHeight: "100%" }}>
          <CardBody>
            <CardTitle>{authors[1].name}</CardTitle>
            <CardText>{authors[1].bio}</CardText>
            <Button
              className="text-uppercase"
              color="primary"
              href={`/author/${slugify(authors[1].name)}`}
            >
              view posts
            </Button>
          </CardBody>
        </Card>
      </div>
    </Row>

    <Row>
      <div className="col-md-3">
        <img src={JohnImage} style={{ maxWidth: "100%" }} alt="John profile" />
      </div>
      <div className="col-md-8">
        <Card style={{ minHeight: "100%" }}>
          <CardBody>
            <CardTitle>{authors[0].name}</CardTitle>
            <CardText>{authors[0].bio}</CardText>
            <Button
              className="text-uppercase"
              color="primary"
              href={`/author/${slugify(authors[0].name)}`}
            >
              view posts
            </Button>
          </CardBody>
        </Card>
      </div>
    </Row>
  </Layout>
)

export default Team
