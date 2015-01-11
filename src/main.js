var React = require('react')

// flux + flux modules
var flux = require('./flux')
var Game = require('./modules/game')

// React components
var Main = require('./ui/components/main')

// setup keydown handler
window.addEventListener('keydown', function(e) {
  Game.actions.handleKeyDown(e.keyCode)
})

// render UI
React.renderComponent(Main(), document.getElementById('main'))

window.flux = flux
window.Game = Game

// start the game loop
Game.actions.start()
