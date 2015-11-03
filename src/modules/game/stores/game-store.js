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
    this.on(actionTypes.ROTATE, rotate)
  },

  getInitialState: function() {
    return toImmutable({
      activePiece: null,
      isOver: false,
      board: helpers.createBoard(WIDTH, HEIGHT),
    })
  }
})

/**
 * Spawns a piece and adds to board
 * @param {Immutable.Map} state
 * @param {Object} payload
 * @param {String} payload.piece
 */
function spawnPiece(state, { type }) {
  return state
}

/**
 * Game tick, move piece down
 */
function moveDown(state) {
  return state
}

/**
 * Tries to move a piece some vector [deltaX, deltaY]
 * if the new position is valid, returns updated state
 */
function move(state, vector) {
  return state
}

/**
 * Moves the active piece left
 */
function moveLeft(state) {
  return state
}

/**
 * Moves the active piece left
 */
function moveRight(state, payload) {
  return state
}

/**
 * Rotates a piece an arbitrary number of times
 * @param {Immutable.Map} state
 * @param {Object} payload
 * @param {String} payload.piece
 */
function rotate(state, { diff }) {
  return state
}







































/**
 * SUPER HIDDEN CODE FOR PRESENTATION
  const translations = [
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
  */
