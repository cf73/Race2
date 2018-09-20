import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'

import {
  Layout,
  CollectionPage
} from '../components'

import { graphql } from 'gatsby'

import {
  white,
  black,
  fogwhite
} from '../colors'

const Container = styled.div`
  background-color: ${white};

  @media (max-width: 812px) { /* mobile */

  }
`
const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;

  font-size: 12px;
  line-height: 24px;
  letter-spacing: 0.22em;
  font-family: 'Quicksand';
  font-weight: 500;
  margin: 0 auto;
  padding-bottom: 15px;
  color: ${fogwhite};
  opacity: 0.8;
`

const FilterButton = styled.div`
  cursor: pointer;

  text-transform: uppercase;
  margin-left: 25px;

  font-weight: ${props => props.selected ? 'bold' : 'none'};
`

const filterItems = ['all', 'episode one', 'episode two', 'episode three']

const Filters = ({selected, select}) => <FiltersContainer>
  View:
  {
    filterItems.map( (name, key) => <FilterButton 
        selected={selected === key}
        key={"filter-"+key}
        onClick={ () => select(key)}
      >
      {name}
      </FilterButton>
    )
  }
</FiltersContainer>


class QA extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      filter: 0
    };
  }

  render() {
    const title = "Q&A"
    const faqs = get(this, `props.data.allNodeFaq.edges`).map(edge => edge.node)
    const description = get(this, `props.data.taxonomyTermQAPage.description.processed`)

    const props = {
      title,
      description,
      cards: { 
        faqs: faqs.filter( ({field_belong_to_episode}) => this.state.filter === 0 ? true : field_belong_to_episode === this.state.filter )
      }
    }

    return (
      <Layout location={this.props.location}>
        <Container>
          <CollectionPage {...props}>
            <Filters
              selected={this.state.filter}
              select={ filter => this.setState({filter}) }
            />
          </CollectionPage>
        </Container>
      </Layout>
    )
  }
}

export default QA

export const query = graphql`
  query QAQuery {
    taxonomyTermQAPage {
      description {
        processed
      }
    }
    allNodeFaq {
      edges {
        node {
          ...FullQAFragment
        }
      }
    }
  }
`
