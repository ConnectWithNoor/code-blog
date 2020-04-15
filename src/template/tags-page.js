import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Button, Badge } from "reactstrap"
import { slugify } from "../utilityFunction"

function TagsPage({ pageContext }) {
  const { tags, tagPostCount } = pageContext
  console.log(tagPostCount)

  return (
    <Layout keywords={["tags", "topics"]} pageTitle="All Tags">
      <SEO title="All Tags" />
      <ul>
        {tags.map(tag => (
          <li key={tag} style={{ marginBlock: "1rem" }}>
            <Button color="primary" href={`/tag/${slugify(tag)}`}>
              {tag} {"    "}
              <Badge color="light">{tagPostCount[tag]}</Badge>
            </Button>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default TagsPage
