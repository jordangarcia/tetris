import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Game from './modules/game'
import { Piece } from './modules/game/records'
import BoardComponent from './components/board'

Game.Piece = Piece;
Game.renderBoard = function(props) {
  return renderToStaticMarkup(React.createElement(BoardComponent, props))
}

export default Game
