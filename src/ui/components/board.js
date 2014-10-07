var React = require('react');
var ReactorMixin = require('nuclear-react-mixin')
var reactor = require('../../nuclear/reactor')
var _ = require('lodash')
var Block = require('./block');

var BLOCK_SIZE = 32
var WIDTH = 10
var HEIGHT = 22

module.exports = React.createClass({

  mixins: [ReactorMixin(reactor)],

  getDataBindings() {
    return {
      'board': 'game.board',
      'softDrop': 'game.softDropCoords',
    }
  },

  render() {
    var style = {
      float: 'left',
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
