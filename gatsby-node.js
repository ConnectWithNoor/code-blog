/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")
const { slugify } = require("./src/utilityFunction")
const authors = require("./src/template/authors")

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const slugFromTitle = slugify(node.frontmatter.title)
    createNodeField({
      node,
      name: "slug",
      value: slugFromTitle,
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const SinglePostTemplate = path.resolve("src/template/single-post.js")

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              author
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.erros) {
      return Promise.reject(res.errors)
    }
    const posts = res.data.allMarkdownRemark.edges

    posts.forEach(({ node }) =>
      createPage({
        path: node.fields.slug,
        component: SinglePostTemplate,
        context: {
          // parsing slug for template to use to get post
          slug: node.fields.slug,
          // fine author imageUrl from authors
          imageUrl: authors.find(x => x.name === node.frontmatter.author)
            .imageUrl,
        },
      })
    )
  })
}
