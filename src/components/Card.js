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

const HEIGHT = 336;
const WIDTH = 306;

const CardGridItem = styled.div`
  position: relative;
  float: left;
  display: inline-block;
  
  margin: 15px;

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
  
  height: ${HEIGHT}px;
  width: ${WIDTH}px;

  background-color: ${white};
  border-radius: 15px;
  overflow: hidden;

  transition: all .3s;
  
  vertical-align: top;

  color: inherit;
  text-decoration: inherit;

  @media (max-width: 812px) { /* mobile */
    max-width: 100vw;
  }
`;

export default StyledCard;

