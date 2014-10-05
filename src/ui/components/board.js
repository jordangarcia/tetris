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
    var style = {
      backgroundColor: '#ccc',
      height: (BLOCK_SIZE * HEIGHT),
      width: (BLOCK_SIZE * WIDTH),
      position: 'relative',
    }

    var previewBlocks = this.state.softDrop
      .map(coord => {
        return Block({
          color: '#888',
          x: coord.x,
          y: coord.y,
          size: BLOCK_SIZE
        })
      })

    var realBlocks = this.state.board
      .filter(x => x !== null)
      .map((val, coord) => {
        return Block({
          color: 'black',
          x: coord.x,
          y: coord.y,
          size: BLOCK_SIZE
        })
      }).toVector().toJS()

    return React.DOM.div({
      style: style
    }, previewBlocks.concat(realBlocks))
  }
})
