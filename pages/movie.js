import React from 'react'
import Movie from '../components/frame'
import styled from 'react-emotion'
import {withRouter} from 'next/router'

const MoviePage = ({ router: { query: { id } } }) => (
  <PageContainer>
    <Movie id={id} />
  </PageContainer>
)

export default withRouter(MoviePage)

const PageContainer = styled('div')`
  text-align: center;
  display: flex;
  margin-top: 80px;
`
