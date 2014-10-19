var Const = require('./constants')
var Tetriminos = require('../tetriminos')
var timeout = require('../timeout')

/**
 * Starts the game timer
 * @param {Reactor} reactor
 */
exports.start = function(reactor) {
  exports.tick(reactor)
}

/**
 * Main game tick action
 * @param {Reactor} reactor
 * @param {Timer} gameTimer
 */
exports.tick = function tick(reactor) {
  if (reactor.get('game.isOver')) {
    return
  }

  reactor.dispatch(Const.MOVE_DOWN)

  // if there is no piece spawn one
  if (!reactor.get('game.activePiece')) {
    // after a move down if there is no active piece
    reactor.dispatch(Const.CLEAR_LINES)
    var nextPiece = reactor.get('pieces.next')
    reactor.dispatch(Const.SPAWN_PIECE, {
      piece: nextPiece
    })
  }

  if (!reactor.get('game.isOver')) {
    // queue next tick
    queueTick(reactor, 1000)
  }
}

exports.moveLeft = function(reactor) {
  if (reactor.get('game.isOver')) {
    return
  }
  reactor.dispatch(Const.LEFT)
}

exports.moveRight = function(reactor) {
  if (reactor.get('game.isOver')) {
    return
  }
  reactor.dispatch(Const.RIGHT)
}

exports.rotateClockwise = function(reactor) {
  if (reactor.get('game.isOver')) {
    return
  }
  reactor.dispatch(Const.ROTATE, {
    diff: 1
  })
}

exports.softDrop = function(reactor) {
  if (reactor.get('game.isOver')) {
    return
  }
  reactor.dispatch(Const.SOFT_DROP)
  // if the softdrop actually set the piece on the board
  if (!reactor.get('game.activePiece')) {
    exports.tick(reactor)
  } else {
    // if it was an actual soft drop defer the game tick
    timeout.reset()
  }
}

exports.pause = function(reactor) {
  reactor.dispatch(Const.PAUSE)
  timeout.cancel()
}

exports.unpause = function(reactor) {
  reactor.dispatch(Const.UNPAUSE)
  exports.start(reactor)
}

function queueTick(reactor, duration) {
  timeout.queue(() => {
    exports.tick(reactor)
  }, duration)
}
