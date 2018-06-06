import { PureComponent } from 'react'
import styled from 'react-emotion'
import Frame from './frame'

export default class extends PureComponent {
  dismiss (e) {
    if (this._shim === e.target || this.movieWrap === e.target) {
      if (this.props.onDismiss) {
        this.props.onDismiss()
      }
    }
  }

  render () {
    return (
      <Shim innerRef={el => (this._shim = el)} onClick={(e) => this.dismiss(e)}>
        <MovieContainer innerRef={el => (this.movieWrap = el)}>
          <Frame id={this.props.id} />
        </MovieContainer>
      </Shim>
    )
  }
}

const Shim = styled('div')`
  position: fixed;
  background: rgba(0,0,0,.65);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 10;
`

const MovieContainer = styled('div')`
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -250px;
  display: flex;
  align-items: center;
  justify-content: center;
`
