import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import get from 'lodash/get'

import Description from './Description'
import Card from '../Card'
import SVGArrow from '../SVGArrow'

import {
  red,
  white,
  articleColors,
  articleTickerColor
} from '../../colors'

const Container = styled(Card)`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background: linear-gradient(to bottom, ${articleColors[0]} 0%, ${articleColors[1]} 100%);

  color: ${white};

  padding-left: 15px;
  padding-right: 15px;

  z-index: 1;
`

const TopImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  z-index: -1;

  width: 100%;
  height: 221px;
  
  background: ${ props => props.background ? `url(${props.background}) center no-repeat` : null };
  background-size: cover;
  
  filter: brightness(50%);
  opacity: 0.53;
`

const TopBlock = styled.div`
  position: relative;

  width: calc(100% - 30px);
  height: 221px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding-right: 15px;
  padding-left: 15px;
`

const ArticleTitle = styled.div`
  font-family: 'Rasa';
  font-size: 36px;
  line-height: 36px;
`

const InnerContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;

  display: flex;
  flex-direction: column;
`

const Author = styled.div`
  font-family: Lato;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.22em;

  text-transform: uppercase;
`

const Ticker = styled.div`
  position: absolute;

  left: 0;
  bottom: 0;

  font-family: Muli;
  font-weight: normal;
  font-size: 12px;
  line-height: 30px;
  letter-spacing: 0.22em;

  border-top-right-radius: 3px;
  background-color: ${articleTickerColor};

  padding: 9px 15px;
  text-transform: uppercase;
`

const BottomBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
`

const Row = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;

  align-items: flex-end;
  justify-content: space-between;
`

const ArrowContainer = styled.div`
  bottom: 15px;
  right: 17px;

  width: 25px;
  height: 20px;
`

const Arrow = () => <ArrowContainer><SVGArrow color={red}/></ArrowContainer>

///

export class ArticleCard extends React.Component {
  render() {
    const { data, onOpen } = this.props
    const article = data;
    const link = `/articles/${kebabCase(article.title)}`

    const background = get(article, 'relationships.field_main_image.localFile.publicURL')
    const description = get(article, 'field_short_version.processed')
    const author = get(article, 'field_author.processed')
    const title = article.title.replace('--','–');

    return (
      <Container
        background={background}
        title={title}
        changed={article.changed}
        onClick={ () => onOpen(link)}
      >
        <TopImage  background={background}/>
      {
        article.field_short_version && <InnerContainer>
          <TopBlock>
            <ArticleTitle>{title}</ArticleTitle>
            <Ticker>article</Ticker>
          </TopBlock>
          <BottomBlock>
            <Description>{description}</Description>
            <Row>
              <Author>by {author}</Author>
              <Arrow />
            </Row>
          </BottomBlock>
        </InnerContainer>
      }
      </Container>
    )
  }
}

export default ArticleCard;
