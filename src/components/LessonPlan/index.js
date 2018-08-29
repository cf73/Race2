import React from 'react'
import styled, { css } from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import get from 'lodash/get'

import {
  FiledUnderLink
} from '../'

import getCards from '../../utils/getCards'

import {
  black,
  white,
  darkWhite,
  whiteShadowTrans,
  red,
  softblack,
} from '../../colors'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 1025px) { /* desktop */

  }

  @media (max-width: 812px) { /* mobile */
     
  }
`

class LessonPlan extends React.Component {
  render() {
    const {overlay} = this.props
    // const nodeName = 'nodeArticle'

    // const background = get(this, `props.data.${nodeName}.relationships.field_main_image.localFile.childImageSharp.original.src`)

    return (
      <Container>
        LessonPlan
      </Container>
    )
  }
}

export default LessonPlan
