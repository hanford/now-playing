const express = require('express')
const next = require('next')
const { join } = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const { ApolloEngine } = require('apollo-engine')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const assert = require('assert')

require('dotenv').config()

const { typeDefs, resolvers, schema } = require('./graphql')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

assert(process.env.TMDB_API_KEY, 'Please provide an API key for themoviedb.org in the environment variable TMDB_API_KEY.')
assert(process.env.ENGINE_API_KEY, 'Please provide an API key for Apollo Engine in the environment variable ENGINE_API_KEY.')

const engine = new ApolloEngine({
  apiKey: process.env.ENGINE_API_KEY,
  stores: [
    {
      name: 'publicResponseCache',
      inMemory: {
        cacheSize: 10485760
      }
    }
  ],
  queryCache: {
    publicFullQueryStore: 'publicResponseCache'
  }
})

app.prepare()
  .then(() => {
    const server = express()
    server.use(cors())

    server.use(
      '/graphql',
      bodyParser.json(),
      graphqlExpress({
        schema,
        tracing: true,
        cacheControl: true,
        context: {
          secrets: {
            TMDB_API_KEY: process.env.TMDB_API_KEY
          }
        }
      })
    )

    server.use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql',
      query: `
        query StarWars {
          movies(query: "Star Wars") {
            title
              overview
            }
          }
        `
    }))


    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
