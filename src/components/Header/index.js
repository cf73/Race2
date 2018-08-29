import React from 'react'
import Link from '../Link'
import styled from 'styled-components'

import Menu from './Menu'

import {
  SVGLogo,
} from '../'

import {
  blackWithOpacity,
  white,
} from '../../colors'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  z-index: 10;

  display: flex;
  flex-direction: row;
  align-items: center;
  
  background-color: ${blackWithOpacity(0.92)};

  height: 60px;

  @media (min-width: 1025px) { /* desktop */
    justify-content: flex-end;
  }

  @media (max-width: 812px) { /* mobile */
    flex-direction: column;

    height: ${props => props.open ? '75vh' : '70px'};

    padding-top: ${props => props.open ? 64 : 0}px;
    padding-bottom: ${props => props.open ? 120 : 0}px;
  }

  transition: all 0.3s ease-out;
`

const ItemsContainer = styled.div`
  flex: 1;

  display: flex;
  flex-direction: row;
  align-items: center;

  justify-content: space-between;

  @media (min-width: 1025px) { /* desktop */
    flex: 3;
  }

  @media (max-width: 812px) { /* mobile */
    display: none;
  }
`

// background-color: ${ props => `#${Math.floor(Math.random()*16777215).toString(16)}`};

const Item = styled(Link)`
  flex: 1;

  text-aligment: center;
  text-decoration: none;

  color: ${white};

  text-transform: uppercase;

  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 10pt;
  line-height: 30px;
  letter-spacing: 0.22em;

  margin-right: 1em;

  @media (min-width: 1025px) { /* desktop */
    /*margin-right: 45px;*/
    margin-right: 2vw;
    font-size: 18px;
    letter-spacing: 0.12em;
  }

  @media (max-width: 812px) { /* mobile */
    display: none;
  }
`

const MobileItem = styled(Item)`
  display: none;

  @media (max-width: 812px) { /* mobile */
    display: block;
    font-size: 15pt;
    letter-spacing: 5px;
  }
`

const Logo = styled.div`
  flex: 1;
  padding-left: 36px;
  padding-right: 36px;

  @media (max-width: 812px) { /* mobile */
    display: none;
  }
`

const pages = [
  { name: 'themes', link: '/themes' },
  { name: 'clips', link: '/clips' },
  { name: 'teaching', link: '/teaching' },
  { name: 'interviews', link: '/interviews' },
  { name: 'articles', link: '/articles' },
  { name: 'q&a', link: '/qa' },
  { name: 'about', link: '/about' }
]

class Header extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      open: false // mobile only
    };
  }

  render() {
    const {open} = this.state;

    return (
      <Container open={open} id="header">
        <Menu
          open={open}
          onClick={ e => this.setState({open: !open})}
        />
        <Logo><Link href='/'><SVGLogo/></Link></Logo>
        <ItemsContainer>
          {
            pages.map( ({name, link}, index) => <Item href={link} key={index}>{name}</Item>)
          }
        </ItemsContainer>

        { open && <Link href='/'><SVGLogo/></Link> }
        {
          open && pages.map( ({name, link}, index) => <MobileItem to={link} key={index}>{name}</MobileItem>)
        }
      </Container>
    );
  }
}

export default Header
