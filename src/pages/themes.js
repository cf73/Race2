import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import kebabCase from '../utils/kebabCase'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import {
  Layout,
  Link,
  ThemeCard
} from "../components"

import gradientColors from '../gradients'

class Themes extends React.Component {
  constructor(props) {
    super(props);

    const edges = get(this, 'props.data.allTaxonomyTermThemes.edges').map( ({node}) => node)
  
    this.state = {
      edges
    };
  }

  componentDidMount() {
    const hash = window.location.hash.replace('#','')
    let index = null

    this.state.edges.map( ({name}, key) => {
      if(kebabCase(name) === hash) index = key
    })

    if(index){
      const ref = this.links[index]
      const domNode = ReactDOM.findDOMNode(ref)
      
      setTimeout(()=>{
        window.scrollTo(0, domNode.offsetTop);
      }, 1)
    }
  }

  render() {
    this.links = []

    const {edges} = this.state

    return (
      <Layout location={this.props.location}>
        <div>
          {
            edges.map( (node, key) =>
              <Link
                ref={ re => {
                  this.links[key] = re
                }}
                key={key}
                to={'/themes/#'+kebabCase(node.name)}
              >
                <ThemeCard data={node} color={gradientColors[key]}/>
              </Link>
            )
          }
        </div>
      </Layout>
    )
  }
}

export default Themes

export const pageQuery = graphql`
  query {
    
    allTaxonomyTermThemes {
      edges {
        node {
          id
          name
          description {
            processed
          }
          relationships {
            field_theme_image {
              localFile {
                publicURL
                childImageSharp {
                  id
                  original {
                    width
                    height
                    src
                  }
                  sizes {
                    src
                  }
                  resolutions {
                    height
                    width
                    src
                  }
                }
              }
            }
            subthemes: backref_field_belongs_to_theme {
              name
              id
              description {
                value
              }
              relationships {
                contentNodes: backref_field_belongs_to_subtheme {
                  __typename
                  ... on node__article {
                    title
                  }
                  ... on node__faq {
                    title
                  }
                  ... on node__clip {
                    title
                  }
                  ... on node__quickfact {
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
    trailerClip:nodeClip(id: { eq:"dda11171-b3eb-44b4-8fa2-06bd24f545b1" } ) {
      ...ClipFragment
    }
  }
`
