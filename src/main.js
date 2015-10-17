var React = require('react')
var ReactDOM = require('react-dom')

var Game = require('./modules/game')
var GameComponent = require('./components/game')

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
