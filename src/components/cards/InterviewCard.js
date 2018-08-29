import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'

import Description from './Description'
import Card from '../Card'
import SVGArrow from '../SVGArrow'

import {
  red,
  interviewColors,
  interviewTickerColor,
  softblack
} from '../../colors'

const Container = styled(Card)`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background: linear-gradient(to bottom, ${interviewColors[0]} 0%, ${interviewColors[1]} 100%);

  color: ${softblack};

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
  height: 310px;
  
 
  background: ${ props => props.background ? `url(${props.background}) center no-repeat` : null };
  background-size: cover;
`

const TopBlock = styled.div`
  position: relative;

  width: auto;
  height: 310px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding-right: 15px;
  padding-left: 15px;
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

const IntervieweeName = styled.div`
  font-family: 'Neuton';
  color: white;
  font-size: 42px;
  line-height: 42px;
  padding-bottom: 15px;
`

const Ticker = styled.div`
  position: absolute;

  left: 0;
  bottom: 0;

  font-family: 'Quicksand';
  font-weight: 500;
  font-size: 12px;
  line-height: 30px;
  letter-spacing: 0.22em;

  border-top-right-radius: 3px;
  background-color: ${interviewTickerColor};

  padding: 5px 15px;
  text-transform: uppercase;
`

const BottomBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;


`

const Bio = styled.div`
  font-family: 'Quicksand';
  display: none;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
`

const Row = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;

  align-items: flex-end;
  justify-content: flex-end;
`

const ArrowContainer = styled.div`
  bottom: 15px;
  right: 17px;

  display: none;
  min-width: 25px;
  height: 20px;
`

const Arrow = () => <ArrowContainer><SVGArrow color={red}/></ArrowContainer>

///

export class InterviewCard extends React.Component {
  render() {
    const { data = {}, onOpen } = this.props
    const interview = data;
    
    const link = `/interviews/${kebabCase(interview.title)}` 
    const background = interview.relationships.field_interviewee.localFile.publicURL;
    const description = interview.field_interview_summary.processed;

    const interviewee = interview.field_interviewee_name ? interview.field_interviewee_name.processed : null;
    const bio = interview.field_interviewee_bio ? interview.field_interviewee_bio.processed : null;

    return (
      <Container onClick={ () => onOpen(link)} >
        <TopImage  background={background}/>
        <InnerContainer>
          <TopBlock>
            <Ticker>interview</Ticker>
          </TopBlock>
          <BottomBlock>
            
            <Description>{description}</Description>
            <Row>
              <Bio dangerouslySetInnerHTML={{ __html: bio }}/>
              <Arrow />
            </Row>
          </BottomBlock>
        </InnerContainer>
      </Container>
    )
  }
}

export default InterviewCard;
