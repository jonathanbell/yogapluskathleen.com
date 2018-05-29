const path = require('path');

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allWordpressPage {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
        allWordpressPost {
          edges {
            node {
              title
              slug
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        console.log(result.errors);
        reject(result.errors);
      }

      // Our pages
      result.data.allWordpressPage.edges.forEach(({ node }) => {
        console.log('Building page layout for:', node.title);
        createPage({
          path: node.slug,
          component: path.resolve('./src/templates/page.js'),
          // The `context` property is where we can define variables that will
          // get passed into our GraphQL queries. It will always be an object.
          context: {
            slug: node.slug
          }
        });
      });

      // Our posts
      result.data.allWordpressPost.edges.forEach(({ node }) => {
        console.log('Building post page layout for:', node.title);
        createPage({
          path: `post/${node.slug}`,
          component: path.resolve('./src/templates/post.js'),
          context: {
            slug: node.slug
          }
        });
      });
    });

    resolve();
  });
};
