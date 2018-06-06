import styled from 'react-emotion'
import Tilt from 'react-tilt'
import { PureComponent } from 'react'
import { Motion, spring, presets } from 'react-motion'

export default class MovieComponent extends PureComponent {
  state = {
    expand: false
  }

  setExpand = value => event => {
    this.setState({ expand: value })
  }

  render () {
    const { movie, onClick } = this.props

    return (
      <Motion
        defaultStyle={{Y: -20, opacity: 0, scale: 0.8, pullUp: 20 }}
        style={{
          Y: spring(this.state.expand ? 0 : -20, presets.wobbly),
          opacity: spring(this.state.expand ? 1 : 0),
          scale: spring(this.state.expand ? 1 : 0.8, presets.wobbly),
          pullUp: spring(this.state.expand ? 0 : 20, presets.wobbly),
        }}
      >
        {({ Y, opacity, scale, pullUp }) => (
          <Movie
            onMouseEnter={this.setExpand(true)}
            onMouseLeave={this.setExpand(false)}
          >
            <RatingBackDrop style={{opacity}}/>
            <Rating style={{transform: `translate3d(0, ${Y}px, 40px) scale(${scale})`, opacity }}>{movie.vote_average}/10</Rating>

            <Poster
              onClick={onClick}
              role='button'
              src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}`}
            />

            <Title style={{ transform: `translate3d(0,${pullUp}px,40px) scale(${scale})`}}>{movie.title}</Title>
          </Movie>
        )}
      </Motion>
    )
  }
}

const Poster = styled('img')`
  max-width: 100%;
  width: 100%;
  height: 278px;
  box-shadow: 0 0 27px rgba(0, 0, 0, 0.15);
  transition: box-shadow 250ms linear;
  border-radius: 4px;

  &:hover {
    box-shadow: 0 10px 47px rgba(0, 0, 0, 0.35);
  }
`

const RatingBackDrop = styled('div')`
  background-image: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0) 80%);
  position: absolute;
  top: 0;
  height: 100px;
  width: 100%;
  border-radius: 4px;
`

const Rating = styled('div')`
  color: white;
  font-weight: 900;
  padding-top: 40px;
  will-change: transform;
  position: absolute;
  top: 0;
  width: 100%;
  transform: translateZ(30px);
  text-shadow: 0 0 10px rgba(0,0,0,1);
`

const Movie = styled(Tilt)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transform-style: preserve-3d;
  position: relative;
  cursor: pointer;

  &:before {
    width: 100%;
    height: 100px;
    display: block;
    position: absolute;
    bottom: 0;
    border-radius: 4px;
    background-image: linear-gradient(rgba(0,0,0,0.0), rgba(0,0,0,0.8) 80%);
    content: '';
  }
`

const Title = styled('div')`
  position: absolute;
  padding-top: 8px;
  transform: translateZ(40px);
  font-size: 18px;
  max-width: 185px;
  bottom: 50px;
  z-index: 10;
  color: white;
  font-weight: 900;
  text-shadow: 0 0 10px rgba(0,0,0,0.8);
`
