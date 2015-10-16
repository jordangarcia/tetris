/**
 * @jsx React.DOM
 */
var React = require('react');

var Game = require('../modules/game')
var flux = require('../flux')

var DEFAULT_BLOCK_SIZE = 20;
var DEFAULT_HEIGHT = 22;
var DEFAULT_WIDTH = 10;

module.exports = (props) => {
  var blockSize = props.blockSize || DEFAULT_BLOCK_SIZE;
  var height = props.height || DEFAULT_HEIGHT;
  var width = props.width || DEFAULT_WIDTH;

  var boardStyle = _.extend({
    width: blockSize * width,
    height: blockSize * height,
    position: 'relative',
    backgroundColor: '#ccc',
  }, props.style);

  var blocks = props.blocks
    .filter(function(val) {
      return !!val
    })
    .map(function(val, coord) {
      var blockStyle = {
        width: blockSize,
        height: blockSize,
        position: 'absolute',
        left: coord.x * blockSize,
        bottom: coord.y * blockSize,
        backgroundColor: '#333',
      }
      return <div style={blockStyle}></div>
    }).toList();

  return (
    <div style={boardStyle}>
      {blocks}
    </div>
  )
}
