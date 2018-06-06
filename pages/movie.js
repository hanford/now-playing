import React from 'react'
import Movie from '../components/frame'
import styled from 'react-emotion'
import {withRouter} from 'next/router'

const MoviePage = ({ router: { query: { id } } }) => (
  <PermaLink>
    <Wrap>
      <Movie id={id} />
    </Wrap>
  </PermaLink>
)

export default withRouter(MoviePage)

const PermaLink = styled('div')`
  padding: 100px;
  text-align: center;
`

const Wrap = styled('div')`
  display: inline-block;
  border: 1px solid #999;
  margin: auto;
`
