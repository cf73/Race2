import React from 'react'
import styled, { css } from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import get from 'lodash/get'

import {
  FiledUnderLink,
  Overlay,
  OverlayBody,
  CloseButton,
  TagTitle
} from '../'

import getCards from '../../utils/getCards'

import {
  black,
  white,
  darkWhite,
  whiteShadowTrans,
  red,
  softblack,
  episodeColors
} from '../../colors'

import reorder from '../../utils/reorder'
import shuffle from '../../utils/shuffle'

const range = require('range')

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  padding-top: 150px;
  padding-bottom: 150px;

  background-color: ${props => props.color ? props.color : white };

  padding-left: 40px;
  padding-right: 80px;

  @media (min-width: 1025px) { /* desktop */
    padding-left: 60px;
  }

  @media (max-width: 812px) { /* mobile */
    padding-left: 20px;
    padding-right: 20px;
  }
`

const InnerContainer = styled(Column)`
  @media (min-width: 1025px) { /* desktop */
    max-width: 700px;
  }
`

const SubTitle = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.12em;

  color: ${black};

  text-transform: uppercase;
`

const EpisodeTitle = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  font-size: 20px;
  text-align: center;
  letter-spacing: 0.12em;

  color: ${black};
`

const Title = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  line-height: 42px;
  font-size: 36px;
  text-align: center;

  color: ${black};
`

class Transcript extends React.Component {
  componentDidMount() {
    setTimeout(()=>window.scrollTo(0,0),1)
  }
  
  render() {
    const title = get(this, 'props.data.title.processed')
    const transcript = get(this, 'props.data.transcript.processed')
    const number = get(this, 'props.number')

    const index = ['one', 'two', 'three'].indexOf(number)
    const color = episodeColors[ index ]

    return (
      <Container color={color}>
        <InnerContainer>
          <SubTitle>episode {number}</SubTitle>
          <EpisodeTitle>{title}</EpisodeTitle>
          <Title>Transcript</Title>
          <Column 
            dangerouslySetInnerHTML={{ __html: transcript }}
          />
        </InnerContainer>
      </Container>
    )
  }
}

export default Transcript
