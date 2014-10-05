var Const = require('./constants')
var Tetriminos = require('../tetriminos')

/**
 * Generates random number 0 to (max - 1)
 */
function randInt(max) {
 return Math.floor((Math.random() * max))
}

/**
 * Main game tick action
 */
exports.tick = function(reactor) {
  var activePiece = reactor.getImmutable('game.activePiece')

  if (!activePiece) {
    reactor.cycle({
      type: Const.CLEAR_LINES,
      payload: {}
    })
    reactor.cycle({
      type: Const.SPAWN_PIECE,
      payload: {
        piece: Tetriminos.pieces[randInt(7)]
      }
    })
  } else {
    reactor.cycle({
      type: Const.MOVE_DOWN,
      payload: {}
    })
  }
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
