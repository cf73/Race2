import React from 'react'
import styled from 'styled-components'

const Description = styled.div`
  font-family: 'Rasa';
  font-size: 22px;
  line-height: 24px;
`;

export default props => <Description dangerouslySetInnerHTML={{ __html: props.children ? props.children.replace(new RegExp('p>', 'g'), 'span>'): null }} />;
