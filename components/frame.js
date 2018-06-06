import React from 'react'
import Link from 'next/link'
import styled from 'react-emotion'
import { Motion, spring, presets } from 'react-motion'

import { graphql, Query } from 'react-apollo'
import gql from 'graphql-tag'

export default props => {
  const { id } = props

  return (
    <Query query={GET_MOVIE} variables={{ id }}>
      {({ loading, error, data }) => (
          <Motion
            defaultStyle={{
              scale: 0,
              showLoader: 0
            }}
            style={{
              showLoader: spring(loading ? 1 : 0, presets.wobbly),
              scale: spring(loading ? 0 : 1, presets.wobbly)
            }}
          >
            {({ scale, showLoader }) => {

              if (loading) return <Movie style={{transform: `scale(${showLoader})`}}><Loader>Loading...</Loader></Movie>

              const { title, poster_path, overview, rating } = data.movie

              return (
                <Movie style={{transform: `scale(${scale})`}}>
                  <Image src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${poster_path}`} />

                  <Sidebar>
                    <h2>{title}</h2>
                    <p>{rating}</p>
                    <p>{overview}</p>
                  </Sidebar>
                </Movie>
              )
            }}
          </Motion>
      )}
    </Query>
  )
}

const GET_MOVIE = gql`
  query movie($id: Int!) {
    movie(id: $id) {
      title
      overview
      poster_path
      id
    }
  }
`

const Loader = styled('Loader')`
  background-color: white;
  padding: 16px;
`

const Movie = styled('div')`
  overflow: hidden;
  height: 500px;
  outline: none;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const Image = styled('img')`
  float: left;
  max-width: 100%;
  height: 500px;
  background: #333;
  color: #fff;
  text-align: center;
  vertical-align: middle;
  line-height: 500px;
  font-size: 40px;
`

const Sidebar = styled('div')`
  float: right;
  background: #fff;
  width: 200px;
  height: 500px;
  text-align: left;
  box-sizing: border-box;
  padding: 20px;
  font-family: Monaco;
  font-size: 11px;
`
