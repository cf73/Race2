import React from "react"
import styled from 'styled-components'
import get from 'lodash/get'
import {
  Layout,
  Transcript
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

  let episode

  switch(number){
    case 'one':
      episode = one
      break
    case 'two':
      episode = two
      break
    case 'three':
      episode = three
      break
    default:
      episode = one
  }

  return (<Layout location={props.location}>
    <Container>
      <Transcript data={episode} number={number}/>
    </Container>
  </Layout>)
}

export const transcriptQuery = graphql`
   query transcriptQuery {
    episodeOne: taxonomyTermEpisodeOnePage {
      ...EpisodeOneFragment
    }
    episodeTwo: taxonomyTermEpisodeTwoPage {
      ...EpisodeTwoFragment
    }
    episodeThree: taxonomyTermEpisodeThreePage {
      ...EpisodeThreeFragment
    }
  }
`
