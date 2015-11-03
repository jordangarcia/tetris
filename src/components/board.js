/**
 * @jsx React.DOM
 */
import React from 'react';
import Game from '../modules/game'
import flux from '../flux'
let {
  flattenAndFilterBoard,
  getBoardDimensions
} = Game.helpers

const BLOCK_SIZE = 20;

module.exports = (props) => {
  const blockSize = props.blockSize || BLOCK_SIZE
  const [width, height] = getBoardDimensions(props.board)
  const boardStyle = _.extend({
    margin: 'auto',
    width: blockSize * width,
    height: blockSize * height,
    position: 'relative',
    backgroundColor: '#DDD',
  }, props.style);

  const flatBoard = flattenAndFilterBoard(props.board)

  const blocks = flatBoard.map((val, [x, y]) => {
    const key = x + '_' + y
    return <div key={key} style={{
      width: blockSize,
      height: blockSize,
      position: 'absolute',
      left: blockSize * x,
      bottom: blockSize * y,
      backgroundColor: '#333',
    }}></div>
  }).toList();

  return (
    <div style={boardStyle}>
      {blocks}
    </div>
  )
}
