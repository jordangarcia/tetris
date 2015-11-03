import React from 'react'
import ReactDOM from 'react-dom'

import Game from './modules/game'
import GameComponent from './components/game'

// setup keydown handler
window.addEventListener('keydown', (e) => {
  Game.actions.handleKeyDown(e.keyCode)
})

// render UI
ReactDOM.render(<GameComponent />, document.getElementById('main'))

window.flux = require('./flux')
window.Game = Game

// start the game loop
Game.actions.start()

window.debugBoard = function() {
  var board = flux.evaluate(Game.getters.board).toJS()
  console.log(board.map(col => JSON.stringify(col)))
}
