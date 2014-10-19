var React = require('react')
var reactor = require('./nuclear/reactor')
var Main = require('./ui/components/main')

var LOOP_TIME = 1000
var UP_ARROW = 38
var LEFT_ARROW = 37
var DOWN_ARROW = 40
var RIGHT_ARROW = 39
var ESCAPE_KEY = 27
var SPACE_KEY = 32

// render UI
React.renderComponent(Main(), document.getElementById('main'))


// setup keybinds
window.addEventListener('keydown', e => {
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
      if (reactor.get('game.isPaused')) {
        reactor.action('game').unpause()
      } else {
        reactor.action('game').pause()
      }
      break
  }
})

reactor.action('game').start()
