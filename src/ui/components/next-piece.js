/**
 * @jsx React.DOM
 */
var React = require('react');
var reactor = require('../../nuclear/reactor')
var Tetriminos = require('../../tetriminos')
var Block = require('./block');

var BLOCK_SIZE = 24

function getState() {
  return {
    nextPiece: reactor.getImmutable('pieces.next')
  }
}

module.exports = React.createClass({

  getInitialState() {
    return getState()
  },

  componentDidMount() {
    this._changeObserver = reactor.createChangeObserver()
    this._changeObserver.onChange(['pieces.next'], piece => {
      this.setState(getState())
    })
  },

  render() {
    var style = {
      backgroundColor: '#ccc',
      height: (BLOCK_SIZE * 4),
      width: (BLOCK_SIZE * 4),
      position: 'relative',
    }

    var piece = this.state.nextPiece
    var blocks = Tetriminos[piece].structure[0].map(coord => {
      return Block({
        color: 'black',
        x: coord.x,
        y: coord.y,
        size: BLOCK_SIZE
      })
    })

    return React.DOM.div({
      style: style
    }, blocks)
  }
})
