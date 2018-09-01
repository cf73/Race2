import styled from 'styled-components'

const SIZE = 46

const PlayButton = styled.div`
  position: relative;
  top: 15px;
  left: 15px;

  width: ${props => props.size ? props.size : SIZE}px;
  height: ${props => props.size ? props.size : SIZE}px;
  border-radius: ${props => props.size ? props.size/2 : SIZE/2}px;
  background-color: rgba(239, 239, 239, 0.76);

  &::after {
    content: '▶';
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    font-family: Lato;
    font-size: ${props => props.size ? props.size/3 : SIZE/3}px;
    line-height: 14px;
  }
`

export default PlayButton
