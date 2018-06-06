import styled from 'react-emotion'
import Tilt from 'react-tilt'

export default ({ movie, onClick }) => (
  <Movie>
    <Poster onClick={onClick} role='button' src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}`} />
    <Title>{movie.title}</Title>
  </Movie>
)

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
