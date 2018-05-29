import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from '../components/header';
import Footer from '../components/footer';

import './elements.css';
import './wordpress.css';

const Layout = ({ children, data, location }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        {
          name: 'description',
          content: data.site.siteMetadata.desc
        },
        {
          name: 'keywords',
          content:
            'yoga, victoria, bc, svaroopa, kathleen, kovach, heart of the village, yoga teacher, meditation'
        }
      ]}
    />
    <Header
      siteTitle={data.site.siteMetadata.title}
      menu={data.wordpressWpApiMenusMenusItems.items}
      background={data.background}
      location={location}
    />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0 1rem'
      }}
    >
      {/* `children()` are all of the child components of this *layout*. */}
      {children()}
    </div>

    <Footer
      menu={data.wordpressWpApiMenusMenusItems.items}
      location={location}
      images={data.allImageSharp}
    />
  </div>
);

Layout.propTypes = {
  children: PropTypes.func
};

export default Layout;

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        desc
      }
    }
    background: imageSharp(id: { regex: "/bg.png/" }) {
      sizes(maxWidth: 1200) {
        # grayscale: true
        ...GatsbyImageSharpSizes
      }
    }
    wordpressWpApiMenusMenusItems(slug: { eq: "main_menu" }) {
      items {
        title
        object_slug
      }
    }
    allImageSharp(filter: { id: { glob: "**/carousel/**" } }) {
      edges {
        node {
          ... on ImageSharp {
            sizes(maxWidth: 1200) {
              src
              sizes
              originalName
            }
          }
        }
      }
    }
  }
`;
