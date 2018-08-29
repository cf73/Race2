import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'

import Card from '../Card'
import SVGArrow from '../SVGArrow'

import {
  qaColor,
  red,
  softblack
} from '../../colors'

const Container = styled(Card)`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background: linear-gradient(to bottom, ${qaColor[0]} 0%, ${qaColor[1]} 100%);
  color: ${softblack};

  padding-left: 15px;
  padding-right: 15px;

  &::before {
    content: '?';
    position: absolute;
    top: -115px;
    right: 100px;

    font-family: 'Quicksand'
    font-weight: 700;
    font-size: 400px;

    opacity: 0.16;
  }
`

const Title = styled.div`
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 12px;
  line-height: 30px;
  letter-spacing: 0.22em;
`

const Question = styled.div`
  font-family: 'Neuton';
  font-weight: 500;
  font-size: 36px;
  line-height: 36px;
`

const ArrowContainer = styled.div`
  position: absolute;

  bottom: 15px;
  right: 17px;

  display: none;
  width: 25px;
  height: 20px;
`

const Arrow = () => <ArrowContainer><SVGArrow color={red}/></ArrowContainer>

///

export class QACard extends React.Component {
  render() {
    const {  data = {}, onOpen } = this.props
    const qa = data
    const link = `/qa/${kebabCase(qa.title)}`

    return (
      <Container
        changed={qa.changed}
        onClick={ () => onOpen(link)}
      >
        <Title>Q&A</Title>
        <Question>{qa.title}</Question>
        <Arrow />
      </Container>
    )
  }
}

export default QACard;
