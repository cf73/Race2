import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import kebabCase from 'lodash/kebabCase'

import episodes from '../utils/episodes-data'

import {
  Layout,
  FiledUnderLink
} from '../components'

import { graphql } from 'gatsby'

import {
  white,
  black,
  gray,
  softblack,
  softWhite
} from '../colors'

const Container = styled.div`
  background-color: ${softWhite};

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

const TopContainer = styled(Column)`
  background-color: ${gray};
  justify-content: center;
  align-items: center;
  padding-top: 150px;
  padding-bottom: 90px;
`

const Quote = styled.div`
  font-family: Neuton;
  font-style: italic;
  font-weight: normal;
  line-height: 48px;
  font-size: 48px;
  text-align: center;

  color: #F5F5F5;

  max-width: 683px;
`

const Author = styled(Quote)`
  font-size: 24px;
`

const SubTitle = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  line-height: 42px;
  font-size: 14px;
  letter-spacing: 0.12em;

  color: ${softblack};
`

const InnerContainer = styled.div`
  width: 600px;
  padding-top: 60px;
`

const Text = styled.div`
  margin-bottom: 90px;

  font-family: Neuton;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  font-size: 20px;

  color: ${softblack};
`

const CardContainer = styled(Column)`
  width: 730px;
  margin-bottom: 30px;

  background-color: ${props => props.color ? props.color : '#FFDDAA'};

  padding-top: 36px;
  padding-bottom: 60px;
  padding-left: 60px;
  padding-right: 60px;
`

const EpisodeNumber = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  line-height: 42px;
  font-size: 14px;
  letter-spacing: 0.12em;

  text-transform: uppercase;

  color: ${black};
`

const EpisodeTitle = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  line-height: 42px;
  font-size: 36px;

  color: ${black};

  margin-top: 15px;
  margin-bottom: 15px;
`

const EpisodeDescription = styled.div`
  font-family: Neuton;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  font-size: 20px;

  color: ${black};

  margin-bottom: 20px;
`

const Card = props => {
  const {
    // title,
    episodeNumber,
    // field_episode,
    description,
    color,
  } = props.data

  const {
    title,
    field_episode_synopsis,
    field_synopsis_copyright
  } = props.synopsis

  const to = `/episodes/${kebabCase(props.number)}`
  const brief = description.split('</p>')[0].replace('<p>','')
  // const brief = field_episode_synopsis.processed

  return (
    <CardContainer color={color}>
      <EpisodeNumber>Episode {episodeNumber}</EpisodeNumber>
      <EpisodeTitle>{title.trim()}</EpisodeTitle>
      <EpisodeDescription dangerouslySetInnerHTML={{ __html: brief}}/>
      <FiledUnderLink
        style={{paddingLeft: 0}}
        color={black} 
        to={to}
      >
        Explore
      </FiledUnderLink>
    </CardContainer>
  )
}

const Footer = styled(Column)`
  align-items: center;

  padding-top: 114px;
  padding-bottom: 200px;
`

///

class About extends React.Component {

  render() {
    const credits = get(this, `props.data.credits.edges`).map(edge => edge.node)
    const quotes = get(this, `props.data.quotes.edges`).map(edge => edge.node)
    const synopsis = get(this, `props.data.synopsis.edges`).map(edge => edge.node)
    const taxonomy = get(this, `props.data.taxonomy.edges`).map(edge => edge.node)
    const transcript = get(this, `props.data.transcript.edges`).map(edge => edge.node)

    const numbers = ['one', 'two', 'three']

    return (
      <Layout location={this.props.location}>
        <Container>
          <TopContainer>
            <Quote>
              “One of the most honest and compelling documentaries I’ve ever seen on race and its impact on this nation.”
            </Quote>
            <Author>
              Acel Moore, Philadelphia Inquirer columnist
            </Author>
          </TopContainer>

          <Column style={{alignItems: 'center'}}>
            <InnerContainer>
              <Column>
                <SubTitle>
                  STATEMENT FROM THE EXECUTIVE PRODUCER
                </SubTitle>
                <Text>
                  <p>
                    Race is one topic where we all think we're experts. Yet ask 10 people to define race or name "the races," and you're likely to get 10 different answers. Few issues are characterized by more contradictory assumptions and myths, each voiced with absolute certainty.
                  </p>
                  <p>
                    In producing this series, we felt it was important to go back to first principles and ask, What is this thing called "race?" - a question so basic it is rarely raised. What we discovered is that most of our common assumptions about race - for instance, that the world's people can be divided biologically along racial lines - are wrong. Yet the consequences of racism are very real.
                  </p>
                  <p>
                    How do we make sense of these two seeming contradictions? Our hope is that this series can help us all navigate through our myths and misconceptions, and scrutinize some of the assumptions we take for granted. In that sense, the real subject of the film is not so much race but the viewer, or more precisely, the notions about race we all hold.
                    We hope this series can help clear away the biological underbrush and leave starkly visible the underlying social, economic, and political conditions that disproportionately channel advantages and opportunities to white people. Perhaps then we can shift the conversation from discussing diversity and respecting cultural difference to building a more just and equitable society.
                  </p>
                  April 2003
                </Text>
              </Column>
            </InnerContainer>
          </Column>

          <Column style={{alignItems: 'center'}}>
            {
              episodes.map( (episode, key) => <Card key={key} data={episode} number={numbers[key]} synopsis={synopsis[key]}/>)
            }
          </Column>

          <Footer>
            <FiledUnderLink
              color={black}
              to='/credits'
            >
              Series Credits
            </FiledUnderLink>
          </Footer>

        </Container>
      </Layout>
    )
  }
}

export default About

export const query = graphql`
  query AboutQuery {
    taxonomy: allTaxonomyTermAboutTheFilmPage {
      edges {
        node {
          id
          field_updated_ep_statement_title {
            processed
          }
          field_updated_ep_statement {
            processed
          }
          field_series_production_credits {
            processed
          }
        }
      }
    }
    
    quotes: allNodeCriticQuote {
      edges {
        node {
          title
          field_critic_quote {
            processed
          }
        }
      }
    }
    
    synopsis: allNodeSynopsis {
      edges {
        node {
          title
          field_episode_synopsis {
            processed
          }
          field_synopsis_copyright {
            processed
          }
        }
      }
    }
    
    credits: allNodeEpisodeCredits {
      edges {
        node {
          title
          field_episode_credits {
            processed
          }
          field_episode_copy {
            processed
          }
        }
      }
    }
    
    transcript: allNodeTranscript {
      edges {
        node {
          title
          body {
            processed
          }
          field_cop {
            processed
          }
        }
      }
    }
}
`

