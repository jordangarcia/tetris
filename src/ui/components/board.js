var React = require('react');
var Block = require('./block');
var BoardMessage = require('./board-message');

var BLOCK_SIZE = 32
var WIDTH = 10
var HEIGHT = 22

module.exports = React.createClass({

  render() {
    var style = {
      float: 'left',
      backgroundColor: '#ccc',
      height: (BLOCK_SIZE * HEIGHT),
      width: (BLOCK_SIZE * WIDTH),
      position: 'relative',
    }

    var previewBlocks = this.props.softDrop
      .map(coord => {
        return Block({
          color: '#888',
          x: coord.x,
          y: coord.y,
          size: BLOCK_SIZE
        })
      })

    var realBlocks = this.props.board
      .filter(x => x !== null)
      .map((val, coord) => {
        return Block({
          color: 'black',
          x: coord.x,
          y: coord.y,
          size: BLOCK_SIZE
        })
      }).toVector().toJS()

    var children = []
      .concat(previewBlocks)
      .concat(realBlocks)

    if (this.props.isOver) {
      children.push(BoardMessage({
        message: 'Game Over!'
      }))
    }

    if (this.props.isPaused) {
      children.push(BoardMessage({
        message: 'Paused'
      }))
    }

    var props = {
      style: style
    }

    return React.DOM.div(props, children)
  }
})
