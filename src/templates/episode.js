import React from "react"
import styled from 'styled-components'
import get from 'lodash/get'
import {
  Layout,
  Episode
} from '../components'

import { graphql } from 'gatsby'

import {
  white
} from '../colors'

const Container = styled.div`
  background-color: ${white};

  @media (max-width: 812px) { /* mobile */

  }
`

export default props => {
  const number = props.pageContext.number

  const one = get(props, 'data.episodeOne')
  const two = get(props, 'data.episodeTwo')
  const three = get(props, 'data.episodeThree')

  const allClips = get(props, 'data.clips.edges').map( ({node}) => node)

  let episode, clips

  switch(number){
    case 'one':
      episode = one
      clips = allClips.filter( ({field_episode}) => field_episode === 1)
      break
    case 'two':
      episode = two
      clips = allClips.filter( ({field_episode}) => field_episode === 2)
      break
    case 'three':
      episode = three
      clips = allClips.filter( ({field_episode}) => field_episode === 3)
      break
    default:
      episode = one
  }

  return (<Layout location={props.location}>
    <Container>
      <Episode data={episode} number={number} clips={clips}/>
    </Container>
  </Layout>)
}

export const episodeQuery = graphql`
  query episodeQuery {
    episodeOne: taxonomyTermEpisodeOnePage {
      ...EpisodeOneFragment
    }
    episodeTwo: taxonomyTermEpisodeTwoPage {
      ...EpisodeTwoFragment
    }
    episodeThree: taxonomyTermEpisodeThreePage {
      ...EpisodeThreeFragment
    }

    clips: allNodeClip {
      edges{
        node {
          ...ClipFragment
        }
      }
    }
  }
`
