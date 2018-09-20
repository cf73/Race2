import React from 'react'
import styled from 'styled-components'
import kebabCase from '../../utils/kebabCase'

import Card from '../Card'
import SVGArrow from '../SVGArrow'

import {
  qaColor,
  red,
  softblack,
  fogwhite,
  smokelime
} from '../../colors'

const Container = styled(Card)`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: ${softblack};
  color: ${fogwhite};

  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.17);

  padding-left: 15px;
  padding-right: 15px;

  &::before {
    content: '?';
    position: absolute;
    top: -115px;
    right: 100px;

    font-family: 'ff-tisa-web-pro';
    font-weight: 400;
    font-size: 400px;

    opacity: 0.16;
    display: none;
  }
`

const Title = styled.div`
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 12px;
  line-height: 30px;
  letter-spacing: 0.12em;
  text-align: center;
  color: ${smokelime};
`

const Question = styled.div`
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 24px;
  line-height: 27px;
  text-align: center;
  padding: 15px;
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
