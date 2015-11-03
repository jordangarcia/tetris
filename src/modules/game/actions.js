import flux from '../../flux'
import timeout from './timeout'
import actionTypes from './action-types'
import getters from './getters'

const TICK_DURATION = 1000

const UP_ARROW = 38
const LEFT_ARROW = 37
const DOWN_ARROW = 40
const RIGHT_ARROW = 39
const ESCAPE_KEY = 27
const SPACE_KEY = 32

/**
 * Starts the game loop
 */
exports.start = function() {
  exports.down()
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
      exports.down();
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
  }
};

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

  timeout.queue(exports.down, TICK_DURATION)
}

/**
 * Moves the current piece left 1 space
 */
exports.left = function() {
  flux.dispatch(actionTypes.LEFT)
}

/**
 * Moves the current piece left 1 space
 */
exports.right = function() {
  flux.dispatch(actionTypes.RIGHT)
}

/**
 * Rotates the active piece clockwise
 */
exports.rotate = function() {
  flux.dispatch(actionTypes.ROTATE, {
    diff: 1
  })
}

/**
 * Soft drops the active piece
 */
exports.softDrop = function() {
  flux.dispatch(actionTypes.SOFT_DROP)
  // if the softdrop actually set the piece on the board
  if (flux.evaluate(getters.shouldSpawnPiece)) {
    // use down for spawn / piece tick
    exports.down()
  } else {
    // if it was an actual soft drop defer the game tick
    timeout.reset()
  }
}
