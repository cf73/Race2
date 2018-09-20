import styled, { css } from 'styled-components'

import {
  black,
} from '../../colors'

const TagTitle = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  text-transform: uppercase;
  font-size: 24px;
  text-align: center;
  letter-spacing: 0.12em;

  padding: 10px;

  margin-top: 50px;
  margin-bottom: 50px;

  color: ${black};

  border: 1px solid ${black};
`

export default TagTitle
