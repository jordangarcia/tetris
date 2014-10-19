var React = require('react')
var reactor = require('./nuclear/reactor')
var Main = require('./ui/components/main')
var keybindings = require('./ui/keybindings')

reactor.initialize()

window.addEventListener('keydown', e => {
  var UP_ARROW = 38
  var LEFT_ARROW = 37
  var DOWN_ARROW = 40
  var RIGHT_ARROW = 39
  var ESCAPE_KEY = 27
  var SPACE_KEY = 32
  var ENTER_KEY = 32
  var keybindType = reactor.get('keybind')

  if (keybindType === 'paused') {
    switch (e.keyCode) {
      case ENTER_KEY:
      case ESCAPE_KEY:
      reactor.action('game').unpause()
      break
    }
  } else if (keybindType === 'gameOver') {
    switch (e.keyCode) {
      case ENTER_KEY:
      case ESCAPE_KEY:
        reactor.action('game').restart()
        break
    }
  } else {
    switch (e.keyCode) {
      case UP_ARROW:
        reactor.action('game').rotateClockwise()
        break
      case DOWN_ARROW:
        reactor.action('game').tick()
        break
      case RIGHT_ARROW:
        reactor.action('game').moveRight()
        break
      case LEFT_ARROW:
        reactor.action('game').moveLeft()
        break
      case SPACE_KEY:
        reactor.action('game').softDrop()
        break
      case ESCAPE_KEY:
        reactor.action('game').pause()
        break
    }
  }
})

// render UI
React.renderComponent(Main(), document.getElementById('main'))

reactor.action('game').start()
