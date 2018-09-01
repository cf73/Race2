import React from "react"
import { Link } from 'gatsby'
import styled from 'styled-components';

import {
  white
} from '../colors'

const Container = styled.div`
  cursor: pointer;
`;

class CardWrapper extends React.Component {
  render() {
    const { link, children, ...rest } = this.props
    if (link) {
      return <Link to={link} {...rest}>{children}</Link>
    } else {
      return <Container {...rest}>{children}</Container>
    }
  }
}

const WIDTH = 462;
const HEIGHT = 341;

const CardGridItem = styled.div`
  position: relative;
  float: left;
  display: inline-block;
  
  margin: 10px;

  color: black;

  @media (max-width: 812px) { /* mobile */
    margin: 0;
    margin-bottom: 10px;
  }
`

class Card extends React.Component {

  render() {
    const { link, className, style, children, ...rest } = this.props

    return (
      <CardGridItem
        {...rest}
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
      >
        <CardWrapper link={link} className={className} style={style}>
          {children}
        </CardWrapper>
      </CardGridItem>
    )
  }
}

///

const StyledCard = styled(Card)`
  position: relative;
  display: block;
  
  height: ${WIDTH}px;
  width: ${HEIGHT}px;

  background-color: ${white};
  border-radius: 3px;
  overflow: hidden;

  box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
  transition: all .3s;
  
  font-family: "ff-tisa-web-pro";
  vertical-align: top;

  color: inherit;
  text-decoration: inherit;

  @media (max-width: 812px) { /* mobile */
    max-width: 100vw;
  }
`;

export default StyledCard;

