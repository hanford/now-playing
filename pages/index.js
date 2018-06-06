import styled from 'react-emotion'
import { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Router, { withRouter } from 'next/router'

import Modal from '../components/modal'
import Movie from '../components/movie'

class MainPage extends PureComponent {

  dismissModal () {
    Router.push('/')
  }

  showMovie = (e, id) => {
    e.preventDefault()

    Router.push(`/?movieId=${id}`, `/movie?id=${id}`)
  }

  render () {
    const { data: { loading, error, nowPlaying }, loadMorePosts, router } = this.props
    const { movies } = nowPlaying

    return (
      <Main>
        {
          router.query.movieId && <Modal id={router.query.movieId} onDismiss={() => this.dismissModal()} />
        }

        <Container>
          <Title>Now Playing</Title>

          <List>
            {
              movies
                .filter((id) => (id !== router.query.movieId))
                .map(movie => <Movie onClick={(e) => this.showMovie(e, movie.id)} movie={movie} key={movie.id} />)
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
  max-width: 100%;
  margin: 0 auto;
  width: 1480px;
`

const List = styled('div')`
  display: grid;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, 180px);
  grid-gap: 20px;

  @media(max-width: 787px) {
    grid-template-columns: repeat(auto-fill,calc(50% - 20px));
  }
`

export const inTheatersMovies = gql`
  query {
    nowPlaying {
      movies {
        title
        overview
        poster_path
        id
      }
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

