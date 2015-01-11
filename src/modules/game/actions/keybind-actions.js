/**
 * Keybind actions based on the current game status
 */
var UP_ARROW = 38
var LEFT_ARROW = 37
var DOWN_ARROW = 40
var RIGHT_ARROW = 39
var ESCAPE_KEY = 27
var SPACE_KEY = 32

exports.handleKeydown = function(reactor, keyCode) {
  switch (keyCode) {
    case UP_ARROW:
      reactor.action('keybinds').up()
      break
    case DOWN_ARROW:
      reactor.action('keybinds').down()
      break
    case RIGHT_ARROW:
      reactor.action('keybinds').right()
      break
    case LEFT_ARROW:
      reactor.action('keybinds').left()
      break
    case SPACE_KEY:
      reactor.action('keybinds').space()
      break
    case ESCAPE_KEY:
      reactor.action('keybinds').escape()
      break
  }
}

exports.left = function(reactor) {
  var status = reactor.get('status')
  if (status === 'running') {
    reactor.action('game').moveLeft()
  }
}

exports.right = function(reactor) {
  var status = reactor.get('status')
  if (status === 'running') {
    reactor.action('game').moveRight()
  }
}

exports.down = function(reactor) {
  var status = reactor.get('status')
  if (status === 'running') {
    reactor.action('game').tick()
  }
}

exports.space = function(reactor) {
  var status = reactor.get('status')
  if (status === 'running') {
    reactor.action('game').softDrop()
  }
}

exports.up = function(reactor) {
  var status = reactor.get('status')
  if (status === 'running') {
    reactor.action('game').rotateClockwise()
  }
}

exports.escape = function(reactor) {
  var status = reactor.get('status')
  if (status === 'running') {
    reactor.action('game').pause()
  } else if (status === 'paused') {
    reactor.action('game').unpause()
  }
}
