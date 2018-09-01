import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import get from 'lodash/get'

import Vimeo from 'react-vimeo'

import {
  FiledUnderLink,
  Overlay,
  OverlayBody,
  CloseButton,
  TagTitle,
  PlayButton
} from '../'

import getCards from '../../utils/getCards'

import {
  black,
  softblack,
  white,
  red,
} from '../../colors'

import reorder from '../../utils/reorder'
import shuffle from '../../utils/shuffle'

const range = require('range')

const TICKER = 'CLIP'
const gradient = `linear-gradient(to bottom, #f9de7b 0%, #ffe7e7 100%)`
const gradient2 = `linear-gradient(to bottom, #A7C6D9 0%, rgba(29,69,59,0.92) 100%)`

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
  min-height: 683px;

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
  padding-top: 20px;

  z-index: 2;

  background-color: ${softblack};
  background-image: ${gradient2};

  @media (min-width: 1025px) { /* desktop */
    background-color: ${ props => props.overlay ? 'rgba(0,0,0,0)' : white };
    background-image: ${ props => props.overlay ? 'none' : gradient2 };
  }

  @media (max-width: 812px) { /* mobile */
     
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
    interviews: [],
    clips: [],
    faqs: [],
    qa: [],
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

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const AllEntitiesContainer = styled(Row)`
  position: absolute;
  top: 0;
  right: 0;

  padding-top: 90px;
  padding-right: 60px;

  z-index: 4;

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    justify-content: center;
  }
`

const AllEntitiesText = `All ${TICKER.toLowerCase()}s`
const AllEntities = () => <AllEntitiesContainer>
  <FiledUnderLink color={softblack} to='/clips'>{AllEntitiesText}</FiledUnderLink>
</AllEntitiesContainer>



const Content = styled(Row)`

  padding-top: 100px;
  width: 100%;
`

const SideBar = styled(Column)`
  display: none;
  min-width: 400px;

  flex: 1;

  padding-left: 60px;
  padding-right: 60px;

  @media (min-width: 1025px) { /* desktop */
    display: flex;
  }

  @media (max-width: 812px) { /* mobile */
    display: none;
  }
`

const ContentBar = styled(Column)`
  align-items: center;
  padding-right: 60px;
`

const SubTitle = styled.div`
  font-family: Lato;
  font-size: 12px;
  line-height: 28px;
  letter-spacing: 0.22em;

  text-transform: uppercase;

  color: ${black};

  padding-left: 0;

  @media (min-width: 1025px) { /* desktop */
    padding-left: 15px;
  }

  @media (max-width: 812px) { /* mobile */
    padding-left: 0;
  }
`

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
  margin-top: 15px;

  border-radius: 3px;
  background-color: ${white};
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

const IMAGE_WIDTH = 663
const IMAGE_HEIGHT = 391

const MainImage = styled.div`
  cursor: pointer;

  display: flex;
  flex-direction: row;

  color: ${white};

  width: ${IMAGE_WIDTH}px;
  height: ${IMAGE_HEIGHT}px;

  border-radius: 3px;
  background-color: ${white};

  background-size: cover !important;
  background-attachment: fixed;
  background: ${ props => props.background ? `url(${props.background}) center no-repeat` : null };

  @media (min-width: 1025px) { /* desktop */
    
  }

  @media (max-width: 812px) { /* mobile */
    width: 100vw;
  }
`

const Title = styled.div`
  width: ${IMAGE_WIDTH}px;

  font-family: 'Tisa Pro';
  font-size: 20px;
  line-height: 24px;

  margin-top: 15px;

  color: ${softblack};
`

const Footer = styled(Row)`
  display: flex;

  width: auto;
  min-height: 20vh;

  padding-bottom: 90px;

  @media (min-width: 1025px) { /* desktop */
    display: none;
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
    align-items: flex-start;
  }
`

const MobileColumn = styled(Column)`
  padding: 0;

  @media (max-width: 812px) { /* mobile */
    margin-top: 45px;
    padding-left: 20px;
  }
`

const MobileSubTitle = styled(SubTitle)`
  padding-left: 100px;
  padding-bottom: 30px;

  @media (max-width: 812px) { /* mobile */
    padding-left: 20px;
  }
`

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const nodeName = 'nodeClip'

class Clip extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      playing: false,
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
          <Row>
            <Row style={{flex: 1, justifyContent: 'center'}}>
              <TagTitle>{name}</TagTitle>
            </Row>
            <CloseButton
              style={{marginRight: 30}}
              color={black}
              simple={true} 
              onClick={ () => this.setState({
                tagName: null,
                tagCards: []
              })}
            />
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
    const {overlay} = this.props

    const background = get(this, `props.data.${nodeName}.relationships.field_poster_image.localFile.childImageSharp.original.src`)
    const videoURL = get(this, `props.data.${nodeName}.field_external_video_url.uri`)
    const videoId = videoURL ? videoURL.split('/').pop() : ''
    const title = get(this, `props.data.${nodeName}.title`)
    const introText = get(this, `props.data.${nodeName}.description.processed`)

    const filedUnder = getFiledUnder(get(this, `props.data.${nodeName}.relationships.field_belongs_to_subtheme`))
    const tags = getTags(get(this, `props.data.${nodeName}.relationships.field_tags`))
    console.log(tags)

    const relatedContent = getRelatedContent(get(this, `props.data.${nodeName}.relationships.field_article_related_content`))

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
        <TopContainer overlay={overlay}>
          { !overlay && <AllEntities /> }
          <Content>
            <SideBar>
              <SubTitle>filed under:</SubTitle>
              {
                filedUnder.map( ({name, link}, key) => <FiledUnderLink key={key} to={link} color={red}>{name}</FiledUnderLink>)
              }
              {
                tags.length > 0
                &&
                <SubTitle style={{marginTop: 90}}>explore:</SubTitle>
              }
              { renderTags() }
            </SideBar>
            <ContentBar>
              <MainImage background={background}>
                <Vimeo
                  style={{width: IMAGE_WIDTH, height: IMAGE_HEIGHT}}
                  videoId={videoId}
                  playButton={
                    <CenteredContainer>
                      <PlayButton
                        size={72}
                      />
                    </CenteredContainer>
                  }
                />
              </MainImage>
              <Title>{title}</Title>
            </ContentBar>
          </Content>
        </TopContainer>
        <BottomContaniner overlay={overlay}>
          <Footer>
            <MobileRow>
              <MobileColumn>
                <SubTitle>filed under:</SubTitle>
                {
                  filedUnder.map( ({name, link}, key) => <FiledUnderLink key={key} to={link}>{name}</FiledUnderLink>)
                }
              </MobileColumn>
                
              <MobileColumn>
                {
                  tags.length > 0
                  &&
                  <SubTitle>explore:</SubTitle>
                }
                { renderTags() }
              </MobileColumn>
            </MobileRow>
          </Footer>
          <MobileSubTitle>see also:</MobileSubTitle>
          <CardsContainer>
            { relatedContent }
          </CardsContainer>
        </BottomContaniner>
      </Container>
    )
  }
}

export default Clip
