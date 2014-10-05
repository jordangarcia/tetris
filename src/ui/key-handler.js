var reactor = require('../nuclear/reactor')

var UP_ARROW = 38
var LEFT_ARROW = 37
var DOWN_ARROW = 40
var RIGHT_ARROW = 39

function handle(e) {
  switch (e.keyCode) {
    case UP_ARROW:
      reactor.action('game').rotateClockwise()
      break
    case DOWN_ARROW:
      reactor.action('game').tick()
      reactor.action('timer').reset()
      break
    case RIGHT_ARROW:
      reactor.action('game').moveRight()
      break
    case LEFT_ARROW:
      reactor.action('game').moveLeft()
      break
  }
}

module.exports = handle
