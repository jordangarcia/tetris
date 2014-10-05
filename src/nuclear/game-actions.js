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
    reactor.cycle({
      type: Const.SPAWN_PIECE,
      payload: {
        piece: Tetriminos.pieces[randInt(7)]
      }
    })
  }
}
