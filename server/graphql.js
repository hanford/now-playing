const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const fetch = require('isomorphic-unfetch')
const cors = require('cors')

const TMDB_API_PATH = 'https://api.themoviedb.org/3'

const gql = String.raw

const typeDefs = gql`
  # Cache all types in Apollo Engine for an hour
  # since the data never changes. maxAge is in seconds
  # See docs here: https://www.apollographql.com/docs/engine/caching.html

  type Query @cacheControl(maxAge: 3600) {
    movies(query: String!): [Movie]
    nowPlaying: NowPlaying
    config: Config
    movie(id: Int!): Movie
  }

  type Movie @cacheControl(maxAge: 3600) {
    id: Int
    title: String
    poster_path: String
    overview: String
    rating: Int
  }

  type NowPlaying @cacheControl(maxAge: 3600) {
    movies: [Movie]
  }

  type Images @cacheControl(maxAge: 3600) {
    poster_sizes: [String]
    base_url: String
    secure_base_url: String
  }

  type Config @cacheControl(maxAge: 3600) {
    images: Images
  }
`

// https://dev-blog.apollodata.com/tutorial-building-a-graphql-server-cddaa023c035
const resolvers = {
  Query: {
    movies (root, args, context) {
      return fetch(
        `${TMDB_API_PATH}/search/movie?api_key=${
          context.secrets.TMDB_API_KEY
        }&query=${args.query}&include_adult=false`
      )
        .then(res => res.json())
        .then(({ results }) => results)
    },
    nowPlaying (root, args, context) {
      return fetch(`${TMDB_API_PATH}/movie/now_playing?api_key=${context.secrets.TMDB_API_KEY}`)
        .then(res => res.json())
        .then(({ results }) => ({ movies: results }))
    },
    config (_, $, context) {
      return fetch(
        `${TMDB_API_PATH}/configuration?api_key=${context.secrets.TMDB_API_KEY}`
      ).then(res => res.json())
    },
    movie (root, args, context) {
      return fetch(
        `${TMDB_API_PATH}/movie/${args.id}?api_key=${
          context.secrets.TMDB_API_KEY
        }`
      ).then(res => res.json())
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

module.exports = {
  typeDefs,
  resolvers,
  schema
}