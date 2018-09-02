import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import get from 'lodash/get'

import {
  SVGChevron,
  FiledUnderLink,
  Overlay,
  OverlayBody,
  CloseButton,
  TagTitle
} from '../'

import getCards from '../../utils/getCards'

import {
  white,
  black,
  red,
  softblack,
  teachingBlue
} from '../../colors'

import reorder from '../../utils/reorder'
import shuffle from '../../utils/shuffle'

const range = require('range')

const PADDING = 138;
const PADDING_TABLET = 80;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Container = styled(Column)`
`

const TopContainer = styled(Row)`
  cursor: pointer;

  align-items: center;

  background-color: ${props => props.open ? teachingBlue : white};

  transition: all 0.3s ease-out;

  padding-left: ${PADDING_TABLET}px;
  padding-right: ${PADDING_TABLET}px;

  @media (min-width: 1025px) { /* desktop */
    padding-left: ${PADDING}px;
    padding-right: ${PADDING}px;
  }

  @media (max-width: 812px) { /* mobile */
     
  }
`

const Title = styled.div`
  font-family: 'Neuton';
  font-size: 36px;
  font-weight: 600;
  line-height: 36px;


  padding-top: 60px;
  padding-bottom: 60px;

  margin-right: 10px;
`

const ChevronContainer = styled.div`
  width: 18px;
  height: 30px;

  transform: rotate(${props => props.open ? 90 : 0}deg);

  transition: all 0.3s ease-out;

  @media (max-width: 812px) { /* mobile */
    right: -25px;
  }
`

const Chevron = ({open}) => <ChevronContainer open={open}>
  <SVGChevron color={softblack} />
</ChevronContainer>

///

const ContentPane = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;

  transition: all 0.3s ease-out;

  height: auto;

  overflow: hidden;

  max-height: ${props => props.open ? 'auto' : 0};
  background-color: ${props => props.open ? teachingBlue : white};

  padding-left: ${PADDING_TABLET}px;
  padding-right: ${PADDING_TABLET}px;

  @media (min-width: 1025px) { /* desktop */
    flex-direction: row;

    padding-left: ${PADDING}px;
    padding-right: ${PADDING}px;
  }

  @media (max-width: 812px) { /* mobile */
     
  }
`

const SmallTitle = styled.div`
  font-family: 'Quicksand';
  font-size: 24px;
  font-weight: 600;
  line-height: 30px;

  letter-spacing: 0.02em;

  color: ${softblack};
`

const Text = styled.div`
  & > ul {
    /*list-style: none;*/
  }

  & > ul > li {
    margin-left: -1em;
  }
  font-size: 20px;
  line-height: 28px;
  font-family: 'Neuton';
  margin-bottom: 20px;
`

const SubTitle = styled.div`
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 12px;
  line-height: 28px;
  letter-spacing: 0.22em;

  text-transform: uppercase;

  padding-left: 0;

  @media (min-width: 1025px) { /* desktop */
    padding-left: 0;
  }

  @media (max-width: 812px) { /* mobile */
    padding-left: 0;
  }
`

const Tags = styled(Column)`
  margin-bottom: 50px;

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    
  }
`

const Tag = styled.div`
  cursor: pointer;
  padding: 3px 15px;

  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 14px;
  line-height: 36px;
  letter-spacing: 0.22em;

  text-transform: uppercase;

  color: ${red};

  margin-right: 15px;
  margin-top: 15px;

  border-radius: 3px;
  background-color: ${white};
`

const Grade = styled.div`
  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 30px;
  line-height: 30px;

  color: ${softblack};

  letter-spacing: 0.02em;
`

const ContentColumn = styled(Column)`
  
  @media (min-width: 1025px) { /* desktop */
    max-width: 50%;
    margin-right: 100px;
  }

  @media (max-width: 812px) { /* mobile */
    
  }
`

const SideColumn = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;

  @media (min-width: 1025px) { /* desktop */
    flex-direction: column;
  }

  @media (max-width: 812px) { /* mobile */
    flex-direction: column;
  }
`

const SideInnerColumn = styled(Column)`
  margin-right: 50px;

  @media (min-width: 1025px) { /* desktop */
    padding-right: 0;
  }

  @media (max-width: 812px) { /* mobile */
    
  }
`

const ViewButton = styled(Row)`
  cursor: pointer;

  justify-content: center;

  margin-top: 50px;
  margin-bottom: 20px;

  background-color: ${white};
  box-shadow: 0px 3px 3px rgba(0,0,0,0.16);

  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 10px;

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    width: 100%;
  }
`

const ViewLessonPlan = props => <ViewButton {...props}>
  <FiledUnderLink 
    color={red}
    to={props.to}
    style={{paddingTop: 0}}
  >
    View Lesson Plan
  </FiledUnderLink>
</ViewButton>

///

const BottomRow = styled(Row)`
  justify-content: center;

  @media (min-width: 1025px) { /* desktop */
    justify-content: flex-start;
  }

  @media (max-width: 812px) { /* mobile */
    
  }
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
    justify-content: center;
    padding-left: 0;
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

class PlanPane extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      tagName: null,
      tagCards: [],
      open: false
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
                zIndex: 5,
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
    const {open} = this.state
    const title = get(this, 'props.data.title')
    const overview = get(this, 'props.data.field_overview.processed')
    const objectives = get(this, 'props.data.field_objectives.processed')

    const grade = get(this, 'props.data.field_grade_levels.processed')

    let subjects = get(this, 'props.data.relationships.field_subject_tags')
    const tags = subjects ? getTags(subjects) : []

    const lessonLink = `/lessons/${kebabCase(title)}`

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
    
    return (
      <Container>
        {
          this.renderOverlay(tagName, tagCards)
        }
        <TopContainer
          open={open}
          onClick={() => this.setState({open: !open})}
        >
          <Title style={{flex:1}}>{title}</Title>
          <Chevron open={open}/>
        </TopContainer>
        <ContentPane open={open}>
          <ContentColumn>
            <SmallTitle>Overview</SmallTitle>
            <Text dangerouslySetInnerHTML={{ __html: overview }}/>

            <SmallTitle>Objectives</SmallTitle>
            <Text dangerouslySetInnerHTML={{ __html: objectives }}/>
          </ContentColumn>
          <Column>
            <SideColumn>
              <SideInnerColumn>
                <SubTitle>subjects</SubTitle>
                { subjects && renderTags() }
              </SideInnerColumn>

              <SideInnerColumn>
                <SubTitle>grade</SubTitle>
                <Grade dangerouslySetInnerHTML={{ __html: grade }} />
              </SideInnerColumn>

            </SideColumn>

            <BottomRow>
              <ViewLessonPlan to={lessonLink}/>
            </BottomRow>
          </Column>
        </ContentPane>
      </Container>
    )
  }
}

export default PlanPane
