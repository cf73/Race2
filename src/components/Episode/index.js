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

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  background-color: ${props => props.color ? props.color : white };

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const MobileRow = styled.div`
  display: flex;
  flex-direction: row;

  padding-top: 150px;
  padding-bottom: 150px;
  padding-left: 25px;

  @media (min-width: 1025px) { /* desktop */
    padding-left: 70px;
  }

  @media (max-width: 812px) { /* mobile */
    flex-direction: column;
    padding-left: 20px;
    padding-right: 20px;
  }
`

const SubTitle = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  line-height: 42px;
  font-size: 14px;
  letter-spacing: 0.12em;

  color: ${black};

  text-transform: capitalize;
`

const Title = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  font-size: 36px;

  color: ${black};
`

const Text = styled.div`
`

const CardsContainer = styled.div`
  display: flex;  
  flex-direction: column; 
  flex-wrap: wrap;

  justify-content: flex-start;
  

  @media (min-width: 1025px) { /* desktop */
  }

  @media (max-width: 812px) { /* mobile */
    justify-content: center;
    align-items: center;
    padding-left: 0;
    padding-right: 0;

    min-width: 100vw;
  }
`

const SideColumn = styled(Column)`
  flex: 1;
  padding-left: 50px;

  @media (min-width: 1025px) { /* desktop */
    padding-left: 100px;
  }

  @media (max-width: 812px) { /* mobile */
    padding-left: 0;
  }
`

class Episode extends React.Component {
  render() {
    const number = get(this, 'props.number')
    const index = ['one', 'two', 'three'].indexOf(number)

    const title = get(this, 'props.data.title.processed')
    const synopsis = get(this, 'props.data.synopsis.processed')
    const clips = get(this, 'props.clips')

    const subthemes = get(this, 'props.data.relationships.subthemes').map( ({name}) => name)
    
    const relatedClips = getCards({
      articles: [],
      clips: clips,
      faqs: [],
      interviews: [],
    })

    const creditsLink = `/credits/${number}`
    const transcriptLink = `/transcripts/${number}`

    const color = episodeColors[ index ]

    return (
      <Container color={color}>
        <MobileRow>
          <Column style={{flex:1}}>
            <SubTitle>episode {number}:</SubTitle>
            <Title>{title}</Title>
            <Text dangerouslySetInnerHTML={{ __html: synopsis }}/>
          </Column>

          <SideColumn>
            <SubTitle>EXPLORE:</SubTitle>
            {
              subthemes.map( (subtheme, key) => <FiledUnderLink
                  key={key}
                  style={{paddingLeft:0}}
                  color={black}
                  to={'/subthemes/' + kebabCase(subtheme)}
                >
                {subtheme}
              </FiledUnderLink>)
            }

            <SubTitle style={{marginTop: 50}}>CLIPS:</SubTitle>

            <CardsContainer>
              { relatedClips }
            </CardsContainer>

            <FiledUnderLink
              style={{paddingLeft: 0}}
              color={black}
              to={creditsLink}
            >
              episode credits
            </FiledUnderLink>
            <FiledUnderLink
              style={{paddingLeft: 0}}
              color={black}
              to={transcriptLink}
            >
              episode transcript
            </FiledUnderLink>
          </SideColumn>
        </MobileRow>
      </Container>
    )
  }
}

export default Episode
