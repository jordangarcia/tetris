var React = require('react')

var Game = require('./modules/game')

//var Main = require('./ui/components/main')

// setup keydown handler
window.addEventListener('keydown', e => {
  Game.actions.handleKeyDown(e.keyCode)
})

// render UI
//React.renderComponent(Main(), document.getElementById('main'))

Game.actions.start()
