import React from 'react'
import styled from 'styled-components'

import {default as XButton} from '../Header/Menu'

const CloseButtonContainer = styled.div`
  position: fixed;
  top: 400px;
  right: 50px;

  z-index: 4;
`

const XButtonContainer = styled(XButton)`
  cursor: pointer;
  display: block;
  position: relative;
`

const CloseButton = props => {
  const {simple} = props
  const width = props.width ? props.width : 100

  if(simple){
    return (
      <XButtonContainer 
        width={width}
        open={true} 
        {...props}
      />
    )
  }else{
    return (
    <CloseButtonContainer>
      <XButtonContainer 
        width={width}
        open={true} 
        {...props}
      />
    </CloseButtonContainer>
  )
  }
}

export default CloseButton
