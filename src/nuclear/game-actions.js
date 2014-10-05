var Const = require('./constants')
var Tetriminos = require('../tetriminos')

/**
 * Main game tick action
 */
exports.tick = function(reactor) {
  reactor.cycle({
    type: Const.MOVE_DOWN,
  })
  trySpawn(reactor)
}

exports.moveLeft = function(reactor) {
  reactor.cycle({
    type: Const.LEFT,
  })
}

exports.moveRight = function(reactor) {
  reactor.cycle({
    type: Const.RIGHT,
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

exports.softDrop = function(reactor) {
  reactor.cycle({
    type: Const.SOFT_DROP
  })
  trySpawn(reactor)
}

function trySpawn(reactor) {
  if (!reactor.getImmutable('game.activePiece')) {
    // after a move down if there is no active piece
    reactor.cycle({
      type: Const.CLEAR_LINES,
      payload: {}
    })
    var nextPiece = reactor.get('pieces.next')
    reactor.cycle({
      type: Const.SPAWN_PIECE,
      payload: {
        piece: nextPiece
      }
    })
  }
}
