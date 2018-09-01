import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import get from 'lodash/get'

import Description from './Description'
import Card from '../Card'

import {
  SVGArrow,
  PlayButton
} from '../'

import {
  white,
  red,
  clipColors,
  clipRadialColors,
  clipTickerColor
} from '../../colors'

const Container = styled(Card)`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background: linear-gradient(to bottom, ${clipColors[0]} 0%, ${clipColors[1]} 100%);

  color: ${white};

  padding-left: 15px;
  padding-right: 15px;

  z-index: 1;
`

const TopImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  z-index: -1;

  width: 100%;
  height: 291px;
  
  background: ${ props => props.background ? `url(${props.background}) center no-repeat` : null };
  background-size: cover;
`

const TopBlock = styled.div`
  position: relative;

  width: auto;
  height: 291px;

  display: flex;
  flex-direction: row;
 
  padding-right: 15px;
`

const InnerContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;

  display: flex;
  flex-direction: column;
`

const Ticker = styled.div`
  position: absolute;

  left: 0;
  bottom: 0;

  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 12px;
  line-height: 30px;
  letter-spacing: 0.22em;

  border-top-right-radius: 3px;
  background-color: ${clipTickerColor};

  padding: 5px 15px;
  text-transform: uppercase;
`

const BottomBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
`

const Row = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;

  align-items: flex-end;
  justify-content: flex-end;
`

const ArrowContainer = styled.div`
  bottom: 15px;
  right: 17px;

  display: none;
  min-width: 25px;
  height: 20px;
`

const TopTicker = styled.div`
  position: absolute;
  top: 10px;
  right: 12px;

  height: 32px;
  padding-left: 15px;
  padding-right: 15px;

  border-radius: 3px;

  text-transform: uppercase;

  font-family: Lato;
  font-size: 12px;
  line-height: 28px;
  letter-spacing: 0.018em;

  background: radial-gradient(${clipRadialColors[0]}, ${clipRadialColors[1]});

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Arrow = () => <ArrowContainer><SVGArrow color={red}/></ArrowContainer>

///

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

export class ClipCard extends React.Component {
  render() {
    const { onOpen } = this.props
    const title = get(this, 'props.data.title')
    const link = `/clips/${kebabCase(title)}`
    const description = title
    const background = get(this, 'props.data.relationships.field_poster_image.localFile.publicURL')
    const field_episode = get(this, 'props.data.field_episode')
    const fromEpisode = `from episode ${field_episode}`

    // const {title, uri} = clip.field_external_video_url

    return (
      <Container onClick={ () => onOpen(link)} >
        <TopImage background={background}/>
        <InnerContainer>
          <TopBlock>
            { field_episode && <TopTicker>{fromEpisode}</TopTicker> }
            <CenteredContainer>
              <PlayButton />
            </CenteredContainer>
            <Ticker>film clip</Ticker>
          </TopBlock>
          <BottomBlock>
            <Description>{description}</Description>
            <Row>
              <Arrow />
            </Row>
          </BottomBlock>
        </InnerContainer>
      </Container>
    )
  }
}

export default ClipCard;
