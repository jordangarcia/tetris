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

/**
 * Starts the game loop
 */
exports.start = function() {
  tick()
};

/**
 * Handle for key down events
 * @param {number} keyCode
 */
exports.handleKeyDown = function(keyCode) {
  switch (keyCode) {
    case UP_ARROW:
      exports.rotate()
      break
    case DOWN_ARROW:
      tick()
      break
    case RIGHT_ARROW:
      exports.right()
      break
    case LEFT_ARROW:
      exports.left()
      break
    case SPACE_KEY:
      exports.softDrop()
      break
    case ESCAPE_KEY:
      togglePause()
      break
  }
};

/**
 * Does a single game tick, moves piece down, clear lines
 * and spawns the next piece
 */
function tick() {
  var gameStatus = getGameStatus()
  if (gameStatus !== 'running') {
    return
  }

  exports.down()

  if (gameStatus === 'running') {
    // queue next tick
    timeout.queue(tick, TICK_DURATION)
  }
}

/**
 * Sends an action to move the piece down.  Will clear lines and spawn
 * piece if the piece was set in place.
 */
exports.down = function() {
  flux.dispatch(actionTypes.MOVE_DOWN)

  // if there is no piece spawn one
  if (flux.evaluate(getters.shouldSpawnPiece)) {
    // after a move down if there is no active piece
    flux.dispatch(actionTypes.SPAWN_PIECE, {
      piece: flux.evaluate(getters.nextPiece)
    })
  }
}

/**
 * Moves the current piece left 1 space
 */
exports.left = function() {
  if (getGameStatus() !== 'running') {
    return
  }
  flux.dispatch(actionTypes.LEFT)
}

/**
 * Moves the current piece left 1 space
 */
exports.right = function() {
  if (getGameStatus() !== 'running') {
    return
  }
  flux.dispatch(actionTypes.RIGHT)
}

/**
 * Rotates the active piece clockwise
 */
exports.rotate = function() {
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
exports.softDrop = function() {
  if (getGameStatus() !== 'running') {
    return
  }

  flux.dispatch(actionTypes.SOFT_DROP)
  // if the softdrop actually set the piece on the board
  if (flux.evaluate(getters.shouldSpawnPiece)) {
    tick()
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
    tick()
  }
}

/**
 * @return {string} game status
 */
function getGameStatus() {
  return flux.evaluate(getters.status)
}
