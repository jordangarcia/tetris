/**
 * Keybind actions based on the current game status
 */

exports.left = function(reactor) {
  var status = reactor.get('game.status')
  if (status === 'running') {
    reactor.action('game').moveLeft()
  }
}

exports.right = function(reactor) {
  var status = reactor.get('game.status')
  if (status === 'running') {
    reactor.action('game').moveRight()
  }
}

exports.down = function(reactor) {
  var status = reactor.get('game.status')
  if (status === 'running') {
    reactor.action('game').tick()
  }
}

exports.space = function(reactor) {
  var status = reactor.get('game.status')
  if (status === 'running') {
    reactor.action('game').softDrop()
  }
}

exports.up = function(reactor) {
  var status = reactor.get('game.status')
  if (status === 'running') {
    reactor.action('game').rotateClockwise()
  }
}

exports.escape = function(reactor) {
  var status = reactor.get('game.status')
  if (status === 'running') {
    reactor.action('game').pause()
  } else if (status === 'paused') {
    reactor.action('game').unpause()
  }
}
