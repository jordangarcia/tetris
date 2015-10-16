/**
 * @jsx React.DOM
 */
var React = require('react');

var Game = require('../modules/game')
var flux = require('../flux')

var BLOCK_SIZE = 20
var WIDTH = 10
var HEIGHT = 22
var BOARD_WIDTH = BLOCK_SIZE * WIDTH
var BOARD_HEIGHT = BLOCK_SIZE * HEIGHT

var DEFAULT_BOARD_STYLE = {
  width: BOARD_WIDTH,
  height: BOARD_HEIGHT,
  backgroundColor: '#ccc',
}

module.exports = React.createClass({
  render: function() {
    var boardStyle = _.extend(DEFAULT_BOARD_STYLE, this.props.style || {});

    var blocks = this.props.blocks
      .filter(function(val) {
        return !!val
      })
      .map(function(val, coord) {
        var blockStyle = {
          width: BLOCK_SIZE,
          height: BLOCK_SIZE,
          position: 'absolute',
          left: coord.x * BLOCK_SIZE,
          bottom: coord.y * BLOCK_SIZE,
          backgroundColor: '#333',
        }
        return <div style={blockStyle}></div>
      }).toList().toJS();

    return (
      <div style={boardStyle}>
        {blocks}
      </div>
    )
  }
})
