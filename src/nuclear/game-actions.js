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

  reactor.cycle({
    type: Const.MOVE_DOWN,
  })

  // if there is no piece spawn one
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

  if (!reactor.get('game.isOver')) {
    // queue next tick
    var loopDuration = 1000
    timeout.queue(() => {
      tick(reactor)
    }, loopDuration)
  }
}

exports.moveLeft = function(reactor) {
  if (reactor.get('game.isOver')) {
    return
  }

  reactor.cycle({
    type: Const.LEFT,
  })
}

exports.moveRight = function(reactor) {
  if (reactor.get('game.isOver')) {
    return
  }

  reactor.cycle({
    type: Const.RIGHT,
  })
}

exports.rotateClockwise = function(reactor) {
  if (reactor.get('game.isOver')) {
    return
  }

  reactor.cycle({
    type: Const.ROTATE,
    payload: {
      diff: 1
    }
  })
}

exports.softDrop = function(reactor) {
  if (reactor.get('game.isOver')) {
    return
  }
  reactor.cycle({
    type: Const.SOFT_DROP
  })
  // if the softdrop actually set the piece on the board
  if (!reactor.getImmutable('game.activePiece')) {
    exports.tick(reactor)
  } else {
    // if it was an actual soft drop defer the game tick
    timeout.reset()
  }
}

exports.pause = function(reactor) {
  reactor.cycle({
    type: Const.PAUSE
  })
  timeout.cancel()
}

exports.unpause = function(reactor) {
  reactor.cycle({
    type: Const.UNPAUSE
  })
}
