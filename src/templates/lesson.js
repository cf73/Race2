import React from "react"
import styled from 'styled-components'
import {
  Layout,
  LessonPlan
} from '../components'

import { graphql } from 'gatsby'

import {
  white
} from '../colors'

const Container = styled.div`
  background-color: ${white};

  @media (max-width: 812px) { /* mobile */

  }
`

export default ({ data, location }) => <Layout location={location}>
  <Container>
    <LessonPlan data={data} />
  </Container>
</Layout>

export const pageQuery = graphql`
  query singleLessonQuery($id: String) {
    nodeLessonPlan(id: { eq: $id }) {
      ...LessonPlanFragment
    }
  }
`
