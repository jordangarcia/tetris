var reactor = require('../nuclear/reactor')

var UP_ARROW = 38
var LEFT_ARROW = 37
var DOWN_ARROW = 40
var RIGHT_ARROW = 39
var ESCAPE_KEY = 27
var SPACE_KEY = 32
var ENTER_KEY = 32

exports.paused = function(e) {
  switch (e.keyCode) {
    case ENTER_KEY:
    case ESCAPE_KEY:
      reactor.action('game').unpause()
      reactor.action('game').pause()
      break
  }
}

exports.gameOver = function(e) {
  switch (e.keyCode) {
    case ENTER_KEY:
    case ESCAPE_KEY:
      reactor.action('game').restart()
      break
  }
}

exports.game = function(e) {
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
