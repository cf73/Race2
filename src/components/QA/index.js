import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import get from 'lodash/get'

import {
  FiledUnderLink,
  Overlay,
  OverlayBody,
  CloseButton,
  TagTitle,
  Link,
  SVGChevron,
} from '../'

import getCards from '../../utils/getCards'

import {
  white,
  black,
  darkWhite,
  backgroundColor,
  red,
  softblack,
} from '../../colors'

import reorder from '../../utils/reorder'
import shuffle from '../../utils/shuffle'

const range = require('range')

const TICKER = 'Q&A'
export const gradient = `linear-gradient(to bottom, #EEFFE8 0%, rgba(255,255,255,0.92) 100%)`
const gradient2 = `linear-gradient(to bottom, #EEFFE8 0%, #F6FFF4 100%)`
const gradient3 = `linear-gradient(to bottom, #A7C6D9 0%, #546D67 100%)`

const Container = styled.div`
  width: 100%;
  
  display: flex;
  flex-direction: column;

  @media (min-width: 1025px) { /* desktop */

  }

  @media (max-width: 812px) { /* mobile */
     
  }
`

const TopContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  width: 100%;
  height: auto;

  background: ${gradient};

  @media (min-width: 1025px) { /* desktop */
    background-color: ${ props => props.overlay ? 'rgba(0,0,0,0)' : white };
    background-image: ${ props => props.overlay ? 'none' : gradient };
  }

  @media (max-width: 812px) { /* mobile */
    background-color: ${white};
    z-index: 1;
  }
`

const BottomContaniner = styled.div`
  position: relative;

  width: 100%;

  z-index: 2;

  background-color: ${white};

  @media (min-width: 1025px) { /* desktop */
    background-color: ${ props => props.overlay ? 'rgba(0,0,0,0)' : white };
    background-image: none;
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

const CardsContainer = styled.div`
  display: flex;  
  flex-direction: row; 
  flex-wrap: wrap;

  justify-content: flex-start;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 70px;

  @media (min-width: 1025px) { /* desktop */
    justify-content: flex-start;
    padding-left: 60px;
    padding-right: 0;
    padding-bottom: 200px;
  }

  @media (max-width: 812px) { /* mobile */
    justify-content: center;
    align-items: center;
    padding-left: 0;
    padding-right: 0;

    min-width: 100vw;
  }
`

const Footer = styled(Row)`
  display: flex;

  width: auto;
  min-height: 20vh;

  background-image: ${props => props.overlay ? null : gradient3 };

  @media (min-width: 1025px) { /* desktop */
    display: flex;
  }

  @media (max-width: 812px) { /* mobile */
    display: flex;
  }
`

const MobileRow = styled(Row)`
  align-items: center;
  padding-left: 60px;

  margin-top: 60px;

  @media (max-width: 812px) { /* mobile */
    flex-direction: column;
    padding-left: 0;
    margin-top: 0;
    justify-content: center;
  }
`

const MobileColumn = styled(Column)`
  padding: 0;

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    padding-top: 60px;
    padding-left: 10px;
  }
`

const FiledUnderContainer = styled(MobileColumn)`
  padding: 0;

  @media (min-width: 1025px) { /* desktop */
    padding-right: 20px;
    min-width: 371px;
  }

  @media (max-width: 812px) { /* mobile */
    padding-top: 30px;
    padding-left: 10px;
  }
`

const SubTitle = styled.div`
  font-family: Lato;
  font-size: 12px;
  line-height: 28px;
  letter-spacing: 0.22em;

  color: ${softblack};

  text-transform: uppercase;

  padding-left: 0;

  @media (min-width: 1025px) { /* desktop */
    padding-left: 15px;
  }

  @media (max-width: 812px) { /* mobile */
    padding-left: 0;
  }
`

const getFiledUnder = array => {
  let results = []

  if(array)
  array.map( ({name}) =>
    results.push({
      name,
      link: `/subthemes/${kebabCase(name)}`
    })
  )

  return results
}

const getTags = array => {
  let results = []

  results = array.map( ({name, relationships}) => {
    return {
      name,
      cards: relationships
    }
  })

  return results
}

const getRelatedContent = array => {
  const cards = {
    articles: [],
    clips: [],
    faqs: [],
  }

  array && array.forEach(item => {
    switch(item.__typename){
      case 'node__faq':
        cards.faqs.push(item)
        break
      case 'node__article':
        cards.articles.push(item)
        break
      case 'node__clip':
        cards.clips.push(item)
        break
      default:
        break;
    }
  })

  return getCards(cards)
}

const AllEntitiesContainer = styled(Row)`
  width: 100vw;
  justify-content: flex-end;

  padding-top: 90px;
  padding-right: 60px;
  padding-bottom: 30px;

  z-index: 4;

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    justify-content: center;
    padding-right: 0;
  }
`

const AllEntitiesText = `All ${TICKER}s`
const AllEntities = () => <AllEntitiesContainer>
  <FiledUnderLink color={backgroundColor}>{AllEntitiesText}</FiledUnderLink>
</AllEntitiesContainer>

///

const Tags = styled.div`
  padding-left: 0;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  
  overflow: auto;

  @media (min-width: 1025px) { /* desktop */
    padding-left: 15px;
  }

  @media (max-width: 812px) { /* mobile */
    padding-left: 0;
  }
`

const Tag = styled.div`
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;

  font-family: Lato;
  font-size: 15px;
  line-height: 36px;
  letter-spacing: 0.22em;
  font-weight: 600;

  text-transform: uppercase;

  color: ${red};

  margin-right: 15px;
  margin-bottom: 15px;

  border-radius: 3px;
  background-color: ${white};
`

const TopCard = styled(Column)`
  position: relative;

  width: 614px;
  min-height: 300px;

  justify-content: center;

  margin-top: 50px;
  margin-bottom: 60px;

  margin-left: 30px;
  margin-right: 30px;

  padding: 60px;

  border-radius: 3px;
  box-shadow: 0px 3px 6px rgba(0,0,0,0.16);

  background-image: ${gradient2};
  color: ${softblack};

  @media (min-width: 1025px) { /* desktop */
    width: 614px;
  }

  @media (max-width: 812px) { /* mobile */
    margin-top: 0;
    margin-bottom: 0;

    padding: 0;
    padding-top: 100px;
    padding-left: 20px;

    width: 100vw;
    max-width: 100vw;
  }

  &::before {
    content: '?';
    position: absolute;

    display: flex;
    flex-direction: row;
    justify-content: center;

    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;

    font-family: 'Tisa Pro';
    font-size: 400px;
    opacity: 0.06;
  }
`

const Title = styled.div`
  font-family: 'Tisa Pro';
  font-size: 36px;
  line-height: 42px;

  margin-bottom: 10px;
`

const Description = styled.div`
  font-family: 'Tisa Pro';
  font-size: 20px;
  line-height: 24px;
`

const MAX_WIDTH = 664

const Experts = styled(Column)`
  max-width: ${MAX_WIDTH}px;
  margin: auto;

  align-items: center;

  color: ${softblack};

  @media (min-width: 1025px) { /* desktop */
    max-width: 664px;
  }

  @media (max-width: 812px) { /* mobile */
    width: 100vw;
    max-width: 100vw;
    padding: 10px;
  }
`

const ExpertTitle = styled.div`
  font-family: Lato;
  font-size: 18px;
  font-weight: 600;

  line-height: 24px;
  letter-spacing: 0.02em;
`

const ExpertAnswer = styled.div`
  font-family: 'Tisa Pro';
  font-size: 17px;
  line-height: 24px;
`

const MobileSideBarContainer = styled(Column)`
  color: ${darkWhite};
  width: 100vw;
`

const ChevronContainer = styled(Link)`
  cursor: pointer;
  
  width: 18px;
  height: 30px;

  transform: rotate(${props => props.open ? 180 : 0}deg);

  transition: all 0.3s ease-out;

  @media (max-width: 812px) { /* mobile */
    display: none;
  }
`

const Chevron = ({left, to}) => <ChevronContainer href={to} open={left}>
  <SVGChevron color={red} />
</ChevronContainer>

///

const InnerTopContainer = styled(Row)`
  align-items: center;

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */

  }
`

const nodeName = 'nodeFaq'

class QA extends React.Component {
  constructor(props) {
    super(props);

    const currentId = get(props, `data.${nodeName}.id`)
    const edges = get(props, 'data.allNodeFaq.edges')
    const totalCount = get(props, 'data.allNodeFaq.totalCount')

    let left = null
    let right = null

    if(edges)
    edges.forEach( (edge, key) => {
      const {node: {id}} = edge;
      if(currentId === id) {
        if( key - 1 >= 0 ) {
          const previous = edges[key - 1]
          const {node: {fields: {slug}}} = previous
          left = `/qa/${kebabCase(slug)}`
        }

        if( key + 1 < totalCount) {
          const next = edges[key + 1]
          const {node: {fields: {slug}}} = next
          right = `/qa/${kebabCase(slug)}`
        }
        
      }
    })
  
    this.state = {
      left,
      right,
      tagName: null,
      tagCards: []
    };
  }

  renderOverlay = (name, cards) => {
    const tagsContent = getCards(cards)
    const order = shuffle(range.range(tagsContent.length))
    const shuffledCards = reorder(tagsContent, order)

    return (
      <Overlay visible={name}>
        <OverlayBody>
          <Row style={{marginBottom: 120}}>
            <Row style={{
              position: 'fixed',
              flex: 1,
              zIndex: 5,
              justifyContent: 'center',
              top: 0, left: 0, right: 0
            }}>
              <TagTitle>{name}</TagTitle>
            </Row>
            <Row
              style={{
                position: 'fixed',
                top: 0,
                right: 30
              }}
            >
              <CloseButton
                color={black}
                simple={true} 
                onClick={ () => this.setState({
                  tagName: null,
                  tagCards: []
                })}
              />
            </Row>
          </Row>
          <CardsContainer>
            { shuffledCards }
          </CardsContainer>
        </OverlayBody>
      </Overlay>
    )
  }

  ///

  render() {
    const {tagName, tagCards} = this.state
    const {left, right} = this.state
    const {overlay} = this.props
    
    const title = get(this, `props.data.${nodeName}.title`)
    const description = get(this, `props.data.${nodeName}.field_question_summary.processed`)

    const field_expert_1  = get(this, `props.data.${nodeName}.field_expert_1.processed`)
    const field_expert_1_answer  = get(this, `props.data.${nodeName}.field_expert_1_answer.processed`)
    const field_expert_2 = get(this, `props.data.${nodeName}.field_expert_2.processed`)
    const field_expert_3_name = get(this, `props.data.${nodeName}.field_expert_3_name.processed`)
    const field_expert_4_name = get(this, `props.data.${nodeName}.field_expert_4_name.processed`)
    const field_expert_4_answer = get(this, `props.data.${nodeName}.field_expert_4_answer.processed`)

    const filedUnder = getFiledUnder(get(this, `props.data.${nodeName}.relationships.field_belongs_to_subtheme`))
    const tags = getTags(get(this, `props.data.${nodeName}.relationships.field_tags`))

    const relatedContent = getRelatedContent(get(this, `props.data.${nodeName}.relationships.field_article_related_content`))

    // TODO: order of answers is messed up in Drupal, fix it there first.

    let answers = []
    if(field_expert_1) answers.push({answer: field_expert_1, expert: field_expert_2})
    if(field_expert_1_answer) answers.push({answer: field_expert_1_answer, expert: field_expert_3_name})
    if(field_expert_4_answer) answers.push({answer: field_expert_4_answer, expert: field_expert_4_name})

    const renderTags = () => (
      <Tags>
        {
          tags.map( ({name, cards}, key) => <Tag
            key={key}
            onClick={ () => this.setState({
                tagName: name,
                tagCards: cards
              })
            }
          >
            {name}
          </Tag>)
        }
      </Tags>
    )

    const MobileSideBar = props => (
      <MobileSideBarContainer>

        <MobileRow style={{alignItems: 'flex-start'}}>
          <FiledUnderContainer>
            <SubTitle>filed under:</SubTitle>
            {
              filedUnder && filedUnder.map( ({name, link}, key) => <FiledUnderLink key={key} to={link}>{name}</FiledUnderLink>)
            }
          </FiledUnderContainer>

          <MobileColumn>
            <SubTitle>explore:</SubTitle>
            { renderTags() }
          </MobileColumn>
        </MobileRow>

        <MobileRow>
          {
            relatedContent.length > 0 && <SubTitle style={{marginTop: 90}}>see also:</SubTitle>
          }
        </MobileRow>

        <CardsContainer>
          { relatedContent }
        </CardsContainer>
        
      </MobileSideBarContainer>
    )

    ///

    return (
      <Container>
        {
          this.renderOverlay(tagName, tagCards)
        }
        <TopContainer overlay={overlay}>
          { !overlay && <AllEntities /> }
          <InnerTopContainer>
            { left && <Chevron to={left} left={true}/>}
            <TopCard>
              <Title>{title}</Title>
              <Description dangerouslySetInnerHTML={{ __html: description }}/>
            </TopCard>
            { right && <Chevron to={right}/>}
          </InnerTopContainer>
        </TopContainer>
        <BottomContaniner overlay={overlay}>
          <Experts>
          {
            answers.map( ({answer, expert}, key) => <Row key={key}>
              <Column>
                <ExpertTitle>{expert}</ExpertTitle>
                <ExpertAnswer dangerouslySetInnerHTML={{ __html: answer }}/>
              </Column>
            </Row>)
          }
          </Experts>
          <Footer overlay={overlay}>
            <MobileSideBar />
          </Footer>
        </BottomContaniner>
      </Container>
    )
  }
}

export default QA
