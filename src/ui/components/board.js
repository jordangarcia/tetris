var React = require('react');
var reactor = require('../../nuclear/reactor')
var _ = require('lodash')
var Block = require('./block');

function getState() {
  return {
    board: reactor.getImmutable('game.board'),
    softDrop: reactor.getImmutable('game.softDropCoords'),
  }
}

var BLOCK_SIZE = 32
var WIDTH = 10
var HEIGHT = 22

module.exports = React.createClass({

  getInitialState() {
    return getState()
  },

  componentDidMount() {
    this._changeObserver = reactor.createChangeObserver()
    this._changeObserver.onChange(['game.board'], board => {
      this.setState(getState())
    })
  },

  render() {
    var blocks = []
    var style = {
      backgroundColor: '#ccc',
      height: (BLOCK_SIZE * HEIGHT),
      width: (BLOCK_SIZE * WIDTH),
      position: 'relative',
    }

    this.state.softDrop.forEach(coord => {
      var props = {
        color: '#888',
        x: coord.x,
        y: coord.y,
        size: BLOCK_SIZE
      }
      blocks.push(Block(props))
    })
    this.state.board.forEach((val, coord) => {
      if (val === null) {
        return
      }
      var props = {
        color: 'black',
        x: coord.x,
        y: coord.y,
        size: BLOCK_SIZE
      }
      blocks.push(Block(props))
    })

    return React.DOM.div({
      style: style
    }, blocks)
  }
})
