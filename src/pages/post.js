import React, { Component } from 'react';
import Link from 'gatsby-link';

export default class Post extends Component {
  render() {
    const { data } = this.props;
    return (
      <article className="wordpress-post">
        <h1 dangerouslySetInnerHTML={{ __html: data.wordpressPost.title }} />
        <div
          dangerouslySetInnerHTML={{
            __html: data.wordpressPost.content
          }}
        />
        <Link
          style={{
            marginTop: '1rem'
          }}
          to="/"
        >
          &larr; Return to post listings
        </Link>
      </article>
    );
  }
}

// Making `$slug` required via `String!` caused errors in GraphQL when URL Path: `/post/`
// Console said: `Variable "$slug" of required type "String!" was not provided.`
export const query = graphql`
  query PostQuery($slug: String) {
    wordpressPost(slug: { eq: $slug }) {
      title
      slug
      content
    }
  }
`;
