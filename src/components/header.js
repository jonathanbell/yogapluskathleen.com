import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Link from 'gatsby-link';
import styled from 'styled-components';
import Img from 'gatsby-image';

import logo from '../images/logo_white.png';

// background-color: #773479;
const HeaderWrapper = styled.div`
  background: linear-gradient(141deg, #773479 10%, #795548 51%, #773479 75%);
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
  height: ${({ isHome }) => (isHome ? '66vh' : '33vh')};
`;

const HeaderContainer = styled.div`
  max-width: 960px;
  margin: auto;
  padding: 1.5rem 1rem;
  position: relative;
  z-index: 2;
  display: flex;

  h1 {
    color: white;
    width: 25%;

    @media (max-width: 650px) {
      position: absolute;
      top: 6rem;
      width: 90%;
      text-align: center;
    }

    span {
      text-indent: -9999px;
      display: block;
      height: 0px;
    }
  }

  img {
    width: 200px;
    max-width: 100%;
    height: auto;
  }
`;

// This is how we style a React component vs a plain old HTML element.
// We can pass in a `Img` component to the `Masthead` in order to style and
// use the `Masthead` as a `Img`.
const MastHead = styled(Img)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const MainNav = styled.nav`
  justify-content: space-between;
  font-family: 'Quicksand', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
  line-height: 1.5;

  @media (min-width: 768px) {
    display: flex;
    width: 75%;
    line-height: initial;
    text-align: initial;
  }

  div {
    padding: 0 3px;
    display: inline-block;
    text-align: center;
  }

  a {
    text-decoration: none;
    color: white;
    font-size: 0.825rem;
    padding: 3px 3px;
    transition: all 0.333s;

    @media (max-width: 650px) {
      font-size: 1rem;
      padding: 0 15px;
    }

    &:hover {
      color: #bbbbbb;
      color: #4730a0;
      text-decoration: none;
    }
  }
`;

export default class Header extends Component {
  state = {
    prevPath: null
  };

  componentDidUpdate = (prevProps, prevState) => {
    // If prevPath was not '/' and current path is '/' then slide low to high
    if (this.state.prevPath !== '/' && this.props.location.pathname === '/') {
      this.wrapper.animate([{ height: '33vh' }, { height: '66vh' }], {
        duration: 300,
        fill: 'forwards',
        easing: 'cubic-bezier(0.85, 0, 0.07, 1)',
        iterations: 1
      });
    }

    // If prevPath is '/' and current url is not '/' then slide high to low
    if (this.state.prevPath === '/' && this.props.location.pathname !== '/') {
      this.wrapper.animate([{ height: '66vh' }, { height: '33vh' }], {
        duration: 300,
        fill: 'forwards',
        easing: 'cubic-bezier(0.85, 0, 0.07, 1)',
        iterations: 1
      });
    }

    if (this.state.prevPath !== this.props.location.pathname) {
      //console.log('Previous path was set to: ', this.state.prevPath);
      this.setState({ prevPath: this.props.location.pathname });
      //console.log('Set new `prevPath` to: ', this.props.location.pathname);
    }
  };

  render() {
    return (
      <HeaderWrapper
        isHome={this.props.location.pathname === '/'}
        ref={wrapper => {
          this.wrapper = ReactDOM.findDOMNode(wrapper);
        }}
      >
        <HeaderContainer>
          <h1>
            <Link
              to="/"
              style={{
                color: 'white',
                textDecoration: 'none'
              }}
            >
              <span>{this.props.siteTitle}</span>
              <img src={logo} alt="Yoga Plus Kathleen logo" />
            </Link>
          </h1>
          <MainNav>
            {this.props.menu.map(item => (
              <div key={item.object_slug}>
                <Link
                  dangerouslySetInnerHTML={{ __html: item.title }}
                  to={`/${item.object_slug}`}
                />
              </div>
            ))}
            <div>
              <a
                style={{
                  backgroundColor: 'cadetblue',
                  transition: 'all 0.333s'
                }}
                href="mailto:kathleenkovach@gmail.com"
                className="contact link"
              >
                Contact
              </a>
            </div>
          </MainNav>
        </HeaderContainer>
        <Img
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            opacity: 0.667,
            filter: 'contrast(111%)'
          }}
          sizes={this.props.background.sizes}
        />
      </HeaderWrapper>
    );
  }
}
