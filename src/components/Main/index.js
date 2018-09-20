import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'

import {
  SVGLogoMain,
} from '../'

import LogoMain from './LogoMain.png'

import {
  gold,
  midnight,
  white
} from '../../colors'

const Container = styled.div`
  background-color: ${midnight};
  position: relative;
  margin-top: -96px;
  @media (max-width: 812px) { /* mobile */

  }
`

const TopContainer = styled.div`
  position: relative;

  height: 100vh;
 

  &::before {
    position: absolute;
    content: '';

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-size: cover !important;
    background-attachment: fixed;
    background: ${ props => props.background ? `url(${props.background}) center no-repeat` : null };
    opacity: .18;

  }
`
const MainLogo = styled.div`
  height: 100vh;
  width: calc(100vw - 120px);
  padding-left: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Slugline = styled.div`
  width: 100%;
  height: 60px;
  letter-spacing: 0.03em;
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 21px;
  line-height: 24px;
  color: ${white};
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 15px;

  @media (max-width: 812px) { /* mobile */
    padding-top: 2em;
    font-size: 18px;
  } 
`

const Image = styled.img`
  width: 100%;
  max-width: 1000px;

  @media (min-width: 1025px) { /* desktop */
    width: 90%;
  }

  @media (max-width: 812px) { /* mobile */
    
  } 
`

export default ({ data, location }) => {
  const background = get(data, `taxonomyTermThemes.relationships.field_theme_image.localFile.childImageSharp.original.src`)

  const episodeOneSynopsis = get(data, `allNodeSynopsis.edges.node[1].field_episode_synopsis.processed`)

  return (
    <Container>
      <TopContainer background={background}>
        <MainLogo>
          <Image src={LogoMain} />
          <Slugline>An online companion to the award-winning documentary series</Slugline>

        </MainLogo>
      </TopContainer>
    </Container>
  )
}
