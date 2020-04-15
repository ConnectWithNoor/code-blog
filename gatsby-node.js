/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")
const { slugify } = require("./src/utilityFunction")
const authors = require("./src/template/authors")
const _ = require("lodash")

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
  const template = {
    singlePost: path.resolve("src/template/single-post.js"),
    tagsPage: path.resolve("src/template/tags-page.js"),
    tagPosts: path.resolve("src/template/tag-posts.js"),
  }
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              author
              tags
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
        component: template.singlePost,
        context: {
          // parsing slug for template to use to get post
          slug: node.fields.slug,
          // fine author imageUrl from authors
          imageUrl: authors.find(x => x.name === node.frontmatter.author)
            .imageUrl,
        },
      })
    )

    // get all tags
    // ['design', 'code', ...]
    let tags = []
    _.each(posts, edge => {
      if (_.get(edge, "node.frontmatter.tags")) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // remove duplicate of tags
    tags = _.uniq(tags)
    // get tags count
    // {design: 5, code: 2, ...}
    let tagPostCount = {}

    tags.forEach(tag => {
      tagPostCount[tag] = (tagPostCount[tag] || 0) + 1
    })

    createPage({
      path: "/tags",
      component: template.tagsPage,
      context: {
        tags,
        tagPostCount,
      },
    })

    // create tag posts pages
    tags.forEach(tag => {
      createPage({
        path: `/tag/${slugify(tag)}`,
        component: template.tagPosts,
        context: {
          tag,
        },
      })
    })
  })
}
