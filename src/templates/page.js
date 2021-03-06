import React, { Component } from 'react';

export default class Page extends Component {
  render() {
    const { data } = this.props;
    return (
      <article className="wordpress-page">
        <h1 dangerouslySetInnerHTML={{ __html: data.wordpressPage.title }} />
        <div dangerouslySetInnerHTML={{ __html: data.wordpressPage.content }} />
      </article>
    );
  }
}

export const query = graphql`
  query PageQuery($slug: String!) {
    wordpressPage(slug: { eq: $slug }) {
      title
      slug
      content
    }
  }
`;
