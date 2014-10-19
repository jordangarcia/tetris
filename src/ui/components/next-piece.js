var React = require('react');
var Tetriminos = require('../../tetriminos')
var Block = require('./block');

var BLOCK_SIZE = 24

module.exports = React.createClass({

  render() {
    var style = {
      backgroundColor: '#ccc',
      height: (BLOCK_SIZE * 4),
      width: (BLOCK_SIZE * 4),
      position: 'relative',
    }

    var tetrimino = Tetriminos[this.props.piece]
    var blocks = tetrimino.structure[0].map(coord => {
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
