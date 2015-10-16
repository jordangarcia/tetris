/**
 * @jsx React.DOM
 */
var React = require('react')
var ReactDOM = require('react-dom')

// flux + flux modules
var flux = require('./flux')
var Game = require('./modules/game')

var GameComponent = require('./components/game')

// setup keydown handler
window.addEventListener('keydown', function(e) {
  Game.actions.handleKeyDown(e.keyCode)
})

// render UI
ReactDOM.render(React.createElement(GameComponent), document.getElementById('main'))

window.flux = flux
window.Game = Game

// start the game loop
Game.actions.start()
