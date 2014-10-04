var reactor = require('./nuclear/reactor')

var LOOP_TIME = 1000
// game loop
function loop(reactor) {
  var activePiece = reactor.getImmutable('activePiece')
  if (!activePiece) {
    reactor.action('game').clearLines()
    reactor.action('game').spawnRandomPiece()
  } else {
    reactor.action('game').tick()
  }
}

setInterval(loop, LOOP_TIME)
