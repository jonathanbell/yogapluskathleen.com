import React, { Component } from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

import tree from '../images/tree.png';

const NewestPost = styled.article`
  h1 {
    margin-bottom: 0;
  }

  small {
    color: #009688;
    font-weight: bold;
    margin-bottom: 1rem;
    display: block;
    margin-top: 3px;
  }
`;

const PostExcerpt = styled.div`
  border-top: 1px dashed #607d8b;
  padding-top: 1rem;

  h2 {
    margin-bottom: 0;
  }

  small {
    color: #009688;
    font-weight: bold;
    margin-bottom: 1rem;
    display: block;
    margin-top: 3px;
  }

  blockquote {
    margin: 0;
  }
`;

export default class IndexPage extends Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        {data.allWordpressPost.edges.map((item, index) => {
          if (index === 0) {
            return (
              <NewestPost key={item.node.id}>
                <header>
                  <h1>
                    <Link to={`/post/${item.node.slug}`}>
                      {item.node.title}
                    </Link>
                  </h1>
                  <small>{item.node.date}</small>
                </header>
                <div dangerouslySetInnerHTML={{ __html: item.node.content }} />
                <p>More news below...</p>
              </NewestPost>
            );
          } else {
            return (
              <PostExcerpt key={item.node.id}>
                <h2>
                  <Link to={`/post/${item.node.slug}`}>{item.node.title}</Link>
                </h2>
                <small>{item.node.date}</small>
                <blockquote
                  cite={`/post/${item.node.slug}`}
                  dangerouslySetInnerHTML={{ __html: item.node.excerpt }}
                />
              </PostExcerpt>
            );
          }
        })}
        <div
          style={{
            marginBottom: '-1rem'
          }}
        >
          <img
            style={{
              maxWidth: '290px',
              display: 'block',
              margin: 'auto',
              marginTop: '1rem'
            }}
            src={tree}
            alt="Gold tree graphic"
          />
        </div>
      </div>
    );
  }
}

export const query = graphql`
  query PostsQuery {
    allWordpressPost {
      edges {
        node {
          id
          title
          slug
          date(formatString: "MMMM DD, YYYY")
          excerpt
          content
        }
      }
    }
  }
`;
