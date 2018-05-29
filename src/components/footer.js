import React, { Component } from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import ImageGallery from 'react-image-gallery';

import logo from '../images/logo_black.png';

import 'react-image-gallery/styles/css/image-gallery.css';

const FooterWrapper = styled.div`
  display: block;
  padding: 4rem 0 1rem 0;
  border-top: 1rem solid #74659a;
`;

const FooterContainer = styled.footer`
  padding: 0 1rem;
  max-width: 960px;
  margin: auto;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  img {
    max-width: 350px;
  }

  small {
    color: #a7a7a7;
    margin-top: 2rem;
  }
`;

export default class Footer extends Component {
  render() {
    const { images } = this.props;
    const imagez = [];

    images.edges.forEach(image => {
      imagez.push({
        original: image.node.sizes.src,
        thumbnail: 'https://lorempixel.com/250/150/nature/1/', // not used but required
        originalAlt: 'Yoga Plus Kathleen - Kathleen Kovach teaching yoga',
        thumbnailAlt: 'Yoga Plus Kathleen image gallery thumbnail',
        sizes: image.node.sizes.sizes
      });
    });

    return (
      <div>
        <div
          style={{
            maxWidth: 500,
            display: 'block',
            margin: 'auto',
            marginBottom: '1rem',
            padding: '0 1rem'
          }}
        >
          {/* https://github.com/xiaolin/react-image-gallery */}
          {this.props.location.pathname === '/classes-and-schedules' && (
            <ImageGallery
              autoPlay={true}
              slideInterval={5000}
              showFullscreenButton={false}
              showPlayButton={false}
              showThumbnails={false}
              items={imagez}
            />
          )}
        </div>

        <FooterWrapper>
          <FooterContainer>
            <div>
              <h3>Site Map</h3>
              <nav>
                {this.props.menu.map(item => (
                  <div key={item.object_slug}>
                    <Link
                      dangerouslySetInnerHTML={{ __html: item.title }}
                      to={`/${item.object_slug}`}
                    />
                  </div>
                ))}
                <div>
                  <a href="mailto:kathleenkovach@gmail.com">Contact</a>
                </div>
              </nav>
            </div>
            <div
              style={{
                textAlign: 'right'
              }}
            >
              <img src={logo} alt="Yoga Plus Kathleen Logo" />
            </div>
            <div />
            <small>
              SVAROOPA® is a registered service mark of S.T.C., Inc., used under
              license.
            </small>
          </FooterContainer>
        </FooterWrapper>
      </div>
    );
  }
}
