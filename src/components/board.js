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
  const [width, height] = getBoardDimensions(props.board)
  const boardStyle = _.extend({
    width: BLOCK_SIZE * width,
    height: BLOCK_SIZE * height,
    position: 'relative',
    backgroundColor: '#ccc',
  }, props.style);

  const flatBoard = flattenAndFilterBoard(props.board)

  const blocks = flatBoard.map((val, [x, y]) => {
    const key = x + '_' + y
    return <div key={key} style={{
      width: BLOCK_SIZE,
      height: BLOCK_SIZE,
      position: 'absolute',
      left: BLOCK_SIZE * x,
      bottom: BLOCK_SIZE * y,
      backgroundColor: '#333',
    }}></div>
  }).toList();

  return (
    <div style={boardStyle}>
      {blocks}
    </div>
  )
}
