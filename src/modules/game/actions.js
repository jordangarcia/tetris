var flux = require('../../flux')
var timeout = require('./timeout')
var actionTypes = require('./action-types')
var getters = require('./getters')

var TICK_DURATION = 1000

var UP_ARROW = 38
var LEFT_ARROW = 37
var DOWN_ARROW = 40
var RIGHT_ARROW = 39
var ESCAPE_KEY = 27
var SPACE_KEY = 32

module.exports = {
  handleKeyDown: function(keyCode) {
    switch (keyCode) {
      case UP_ARROW:
        rotateClockwise()
        break
      case DOWN_ARROW:
        tick()
        break
      case RIGHT_ARROW:
        moveRight()
        break
      case LEFT_ARROW:
        moveLeft()
        break
      case SPACE_KEY:
        softDrop()
        break
      case ESCAPE_KEY:
        togglePause()
        break
    }
  },
  start: function() {
    tick()
  }
}

/**
 * Does a single game tick, moves piece down, clear lines
 * and spawns the next piece
 */
function tick() {
  var gameStatus = getGameStatus()
  if (gameStatus !== 'running') {
    return
  }

  flux.dispatch(actionTypes.MOVE_DOWN)

  // if there is no piece spawn one
  if (!flux.evaluate(['game', 'activePiece'])) {
    // after a move down if there is no active piece
    flux.dispatch(actionTypes.CLEAR_LINES)
    flux.dispatch(actionTypes.SPAWN_PIECE, {
      piece: flux.evaluate(getters.nextPiece)
    })
  }

  if (gameStatus === 'running') {
    // queue next tick
    timeout.queue(tick, TICK_DURATION)
  }
}

/**
 * Moves the current piece left 1 space
 */
function moveLeft() {
  if (getGameStatus() !== 'running') {
    return
  }
  flux.dispatch(actionTypes.LEFT)
}

/**
 * Moves the current piece left 1 space
 */
function moveRight() {
  if (getGameStatus() !== 'running') {
    return
  }
  flux.dispatch(actionTypes.RIGHT)
}

/**
 * Rotates the active piece clockwise
 */
function rotateClockwise() {
  if (getGameStatus() !== 'running') {
    return
  }
  flux.dispatch(actionTypes.ROTATE, {
    diff: 1
  })
}

/**
 * Soft drops the active piece
 */
function softDrop() {
  if (getGameStatus() !== 'running') {
    return
  }

  flux.dispatch(actionTypes.SOFT_DROP)
  // if the softdrop actually set the piece on the board
  if (!flux.evaluate(['game', 'activePiece'])) {
    this.tick()
  } else {
    // if it was an actual soft drop defer the game tick
    timeout.reset()
  }
}

/**
 * Toggle paused based on whether the game is already paused
 */
function togglePause() {
  var status = getGameStatus()
  if (status === 'running') {
    flux.dispatch(actionTypes.PAUSE)
    timeout.cancel()
  } else if (status === 'paused') {
    flux.dispatch(actionTypes.UNPAUSE)
    this.tick()
  }
}

/**
 * @return {string} game status
 */
function getGameStatus() {
  return flux.evaluate(getters.status)
}
