import styled from 'react-emotion'
import { PureComponent } from 'react'
import { graphql, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import Router, { withRouter } from 'next/router'
import FlipMove from 'react-flip-move'

import Modal from '../components/modal'
import Movie from '../components/movie'

class MainPage extends PureComponent {
  state = {
    search: '',
    movies: []
  }

  dismissModal () {
    Router.push('/')
  }

  showMovie = (e, id) => {
    e.preventDefault()

    Router.push(`/?movieId=${id}`, `/movie?id=${id}`)
  }

  onSearchChange = client => async event => {
    console.log(client)
    const { value } = event.target

    this.setState({ search: value })

    const { data } = await client.query({
      query: SEARCH_MOVIES,
      variables: { query: value }
    })

    if (data.movies) {
      this.setState({ movies: data.movies })
    }
  }

  render () {
    const { data: { loading, error, nowPlaying }, router } = this.props
    const { movies } = nowPlaying
    const { movies: searchMovies } = this.state

    return (
      <Main>
        {
          router.query.movieId && <Modal id={router.query.movieId} onDismiss={() => this.dismissModal()} />
        }

        <Container>
          <Navbar>
            <Title>{this.state.search.length === 0 ? 'Now Playing' : 'Searching'}</Title>

            <ApolloConsumer>
              {client => (
                <Input type='search' placeholder='Search' onChange={this.onSearchChange(client)}/>
              )}
            </ApolloConsumer>
          </Navbar>

          <List>
            {
              this.state.search !== ''
              ? searchMovies.map(movie => <Movie onClick={(e) => this.showMovie(e, movie.id)} movie={movie} key={movie.id} />)
              : movies.map(movie => <Movie onClick={(e) => this.showMovie(e, movie.id)} movie={movie} key={movie.id} />)
            }
          </List>
        </Container>
      </Main>
    )
  }
}

const Main = styled('main')`
  font-family: sans-serif;
`

const Title = styled('h1')`
  font-weight: bold;
  margin: 20px 0;
`

const Container = styled('div')`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`

const List = styled('div')`
  display: grid;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, 183px);
  grid-gap: 20px;

  @media(max-width: 787px) {
    grid-template-columns: repeat(auto-fill,calc(50% - 20px));
  }
`

const Navbar = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Input = styled('input')`
  padding: 12px;
  font-size: 16px;
  outline: none;
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 60px;
`

const inTheatersMovies = gql`
  query getInTheaters {
    nowPlaying {
      movies {
        title
        overview
        poster_path
        id
        vote_average
      }
    }
  }
`

const SEARCH_MOVIES = gql`
  query movie ($query: String!) {
    movies (query: $query) {
      title
      overview
      poster_path
      id
      vote_average
    }
  }
`

const hasRouter = withRouter(MainPage)

export default graphql(inTheatersMovies, {
  props: ({ data }) => {
    return {
      data
    }
  }
})(hasRouter)

// loadMorePosts: () => {
//   return data.fetchMore({
//     variables: {
//       skip: data.allPosts.length
//     },
//     updateQuery: (previousResult, { fetchMoreResult }) => {
//       if (!fetchMoreResult) {
//         return previousResult
//       }
//       return Object.assign({}, previousResult, {
//         // Append the new posts results to the old one
//         allPosts: [...previousResult.allPosts, ...fetchMoreResult.allPosts]
//       })
//     }
//   })
// }

