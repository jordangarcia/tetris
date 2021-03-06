import Nuclear, { toImmutable } from 'nuclear-js'
import { Piece } from '../records'
import actionTypes from '../action-types'
import Tetriminos from '../tetriminos'
import * as helpers from '../helpers'

const WIDTH = 10
const HEIGHT = 22

/**
 * The core that tracks the state of the board
 */
module.exports = Nuclear.Store({
  initialize: function() {
    this.on(actionTypes.SPAWN_PIECE, spawnPiece)
    this.on(actionTypes.LEFT, moveLeft)
    this.on(actionTypes.RIGHT, moveRight)
    this.on(actionTypes.MOVE_DOWN, moveDown)
    this.on(actionTypes.SOFT_DROP, softDrop)
    this.on(actionTypes.ROTATE, rotate)
    this.on(actionTypes.PAUSE, pause)
    this.on(actionTypes.UNPAUSE, unpause)
  },

  getInitialState: function() {
    return toImmutable({
      clears: [],
      activePiece: null,
      isOver: false,
      isPaused: false,
      board: helpers.createBoard(WIDTH, HEIGHT)
    })
  }
})

/**
 * Game tick, move piece down
 */
function moveDown(state) {
  var newState = state
  var piece = state.get('activePiece')
  if (!piece) {
    return state
  }

  var board = state.get('board')
  // move piece down and check if is valid
  var newPiece = helpers.move(piece, [0, -1])
  if (helpers.isValidPosition(newPiece, board)) {
    newState = state.set('activePiece', newPiece)
  } else {
    // cannot move down, lock piece on board
    newState = state
      .set('board', helpers.addPieceToBoard(piece, board))
      .set('activePiece', null)

    return clearLines(newState)
  }
  return newState
}

/**
 * Soft dropping is moving a piece straight down to its lowest
 * valid position.  If the piece is already in its lowest position
 * then lock it to the board
 */
function softDrop(state) {
  var piece = state.get('activePiece')
  var board = state.get('board')

  var newPiece = helpers.move(piece, [0, -1])
  if (!helpers.isValidPosition(newPiece, board)) {
    // if the piece is at the bottom of the board simulate a moveDown
    return moveDown(state)
  }

  newPiece = helpers.softDropPiece(piece, board)
  return state.set('activePiece', newPiece)
}

/**
 * Spawns a piece and adds to board
 */
function spawnPiece(state, payload) {
  var piece = payload.piece
  var board = state.get('board')
  var spawnedPiece = new Piece({
    type: piece,
    rotation: 0,
    pos: Tetriminos[piece].spawnPosition,
  })

  if (!helpers.isValidPosition(spawnedPiece, board)) {
    // if the spawned piece is invalid the game is over
    return state
      .set('activePiece', spawnedPiece)
      .set('isOver', true)
  }

  return state.set('activePiece', spawnedPiece)
}

/**
 * Tries to move a piece some vector [deltaX, deltaY]
 * if the new position is valid, returns updated state
 */
function move(state, vector) {
  var activePiece = state.get('activePiece')
  var board = state.get('board')

  var movedPiece = helpers.move(activePiece, vector)
  if (helpers.isValidPosition(movedPiece, board)) {
    return state.set('activePiece', movedPiece)
  }
  return state
}

/**
 * Moves the active piece left
 */
function moveLeft(state) {
  return move(state, [-1, 0])
}

/**
 * Moves the active piece left
 */
function moveRight(state, payload) {
  return move(state, [1, 0])
}

/**
 * Rotates a piece an arbitrary number of times
 */
function rotate(state, payload) {
  var board = state.get('board')
  var piece = state.get('activePiece')

  var rotatedPiece = helpers.rotate(piece, payload.diff)
  var translations = [
    [0,0],
    [0,1],
    [0,2],
    [1,0],
    [2,0],
    [3,0],
    [-1,0],
    [-2,0],
    [-3,0],
    [0,-1],
    [0,-2],
    [0,-3],
  ]

  // when rotating pieces against walls or other pieces, a translation may
  // be necessary to "bounce off the walls".  Iterate through the translations
  // until a valid position is found
  for (var i = 0; i < translations.length; i++) {
    rotatedPiece = helpers.move(rotatedPiece, translations[i])
    if (helpers.isValidPosition(rotatedPiece, board)) {
      return state.set('activePiece', rotatedPiece)
    }
  }

  return state
}

function pause(state) {
  return state.set('isPaused', true)
}

function unpause(state) {
  return state.set('isPaused', false)
}

/**
 * Clears all existing lines
 */
function clearLines(state) {
  var board = state.get('board')

  var lines = helpers.getLines(board, WIDTH, HEIGHT)
  if (lines.length === 0) {
    return state
  }

  // add the number of lines to the record of clears
  return state
    .update('clears', vect => vect.push(lines.length))
    .set('board', helpers.removeLines(board, lines, WIDTH, HEIGHT))
}

