var Const = require('./constants')
var Tetriminos = require('../tetriminos')

/**
 * Generates random number 0 to (max - 1)
 */
function randInt(max) {
 return Math.floor((Math.random() * max))
}

exports.spawnRandomPiece = function(reactor) {
  reactor.cycle({
    type: Const.SPAWN_PIECE,
    payload: {
      piece: Tetriminos.pieces[randInt(7)]
    }
  })
}

exports.clearLines = function(reactor) {
  reactor.cycle({
    type: Const.CLEAR_LINES,
    payload: {}
  })
}

exports.tick = function(reactor) {
  reactor.cycle({
    type: Const.TICK,
    payload: {}
  })
}

exports.moveLeft = function(reactor) {
  reactor.cycle({
    type: Const.LEFT,
    payload: {}
  })
}

exports.moveRight = function(reactor) {
  reactor.cycle({
    type: Const.RIGHT,
    payload: {}
  })
}

exports.rotateClockwise = function(reactor) {
  reactor.cycle({
    type: Const.ROTATE,
    payload: {
      diff: 1
    }
  })
}
