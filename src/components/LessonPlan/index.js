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

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const MainText = styled.div`
  font-family: 'ff-tisa-web-pro';
  font-weight: 300;
  font-size: 17px;
  line-height: 24px;
  
  color: ${softblack};
 `

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 1025px) { /* desktop */

  }

  @media (max-width: 812px) { /* mobile */
     
  }
`

const MobileRow = styled.div`
  display: flex;
  flex-direction: row;

  padding-top: 64px;

  @media (min-width: 1025px) { /* desktop */

  }

  @media (max-width: 812px) { /* mobile */
     flex-direction: column;
  }
`

const Title = styled.div`
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 36px;
  line-height: 42px;

  margin-bottom: 17px;

  color: ${softblack};
`

const SubTitle = styled.div`
  font-family: Quicksand;
  font-weight: 500;
  font-size: 12px;
  line-height: 28px;
  letter-spacing: 0.22em;

  text-transform: uppercase;

  padding-left: 0;

  @media (min-width: 1025px) { /* desktop */
    padding-left: 15px;
  }

  @media (max-width: 812px) { /* mobile */
    padding-left: 0;
  }
`

class LessonPlan extends React.Component {
  componentDidMount() {
    setTimeout(()=>window.scrollTo(0,0),1)
  }
  
  render() {
    const {overlay} = this.props
    console.log(this.props)
    const nodeName = 'nodeLessonPlan'

    const title = get(this, `props.data.${nodeName}.title`)
    const description = get(this, `props.data.${nodeName}.field_description.processed`)
    const lessonPlan = get(this, `props.data.${nodeName}.field_lesson_plan.processed`)

    const author = get(this, `props.data.${nodeName}.field_lesson_plan_author.processed`)
    const authorBio = get(this, `props.data.${nodeName}.field_less_plan_author_bio.processed`)
    const authorCopyright = get(this, `props.data.${nodeName}.field_copyright_a.processed`)
    

    return (
      <Container>
        <MobileRow>
          <Column style={{flex:3}}>
            <Row>
            <Title>{title}</Title>
            </Row>
            <Column>
              <MainText dangerouslySetInnerHTML={{ __html: description }}/>
            </Column>
            <Column>
              <MainText dangerouslySetInnerHTML={{ __html: lessonPlan }}/>
            </Column>
            <SubTitle>materials</SubTitle>
          </Column>
          <Column style={{flex:1, paddingLeft: 30}}>
            <Row>Lesson Plan by {author}</Row>
            <Row>{authorBio}</Row>
            <Row>{authorCopyright}</Row>
          </Column>
        </MobileRow>
      </Container>
    )
  }
}

export default LessonPlan
