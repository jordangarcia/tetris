var Nuclear = require('nuclear-js')
var Immutable = require('immutable')
var Const = require('./constants')
var Tetriminos = require('../tetriminos')
var BoardPiece = require('../records/board-piece')
var boardHelpers = require('./board-helpers')
var pieceHelpers = require('./piece-helpers')

var WIDTH = 10
var HEIGHT = 22

/**
 * The core that tracks the state of the board
 */
module.exports = Nuclear.createCore({
  initialize() {
    this.on(Const.SPAWN_PIECE, addPiece)
    this.on(Const.CLEAR_LINES, clearLines)
    this.on(Const.LEFT, moveLeft)
    this.on(Const.RIGHT, moveRight)
    this.on(Const.TICK, tick)

    this.computed('board', ['activePiece', 'existingBoard'], calculateBoard)
    // initial state
    return {
      stats: {
        lines: 0,
        score: 0
      },
      activePiece: null,
      recentPiece: null,
      existingBoard: boardHelpers.generateBlankBoard(WIDTH, HEIGHT),
    }
  }
})

/**
 * @param {Immutable.Vector}
 */
function calculateBoard(activePiece, board) {
  if (activePiece) {
    return boardHelpers.addPieceToBoard(activePiece, board)
  }
  return board
}

/**
 * Game tick, move piece down
 */
function tick(state, payload) {
  var newState
  var piece = state.get('activePiece')
  var existingBoard = state.get('existingBoard')
  var board = state.get('board')
  if (piece) {
    // move piece down and check if is valid
    var newPiece = pieceHelpers.movePiece(piece, [0, -1])
    if (boardHelpers.isValidPosition(newPiece, board)) {
      newState = state
        .set('activePiece', newPiece)
        .set('recentPiece', null)
    } else {
      newState = state
        .set('existingBoard', boardHelpers.addPieceToBoard(piece, existingBoard))
        .set('recentPiece', piece)
        .set('activePiece', null)
    }
  }
  return newState
}

/**
 * Spawns a piece and adds to board
 */
function addPiece(state, payload) {
  var piece = payload.piece
  var boardPiece = new BoardPiece({
    type: piece,
    rotation: 0,
    pos: Tetriminos[piece].spawnPosition,
  })

  return state.set('activePiece', boardPiece)
}

/**
 * Clears all existing lines
 */
function clearLines(state, payload) {
  var board = state.get('existingBoard')
  var counter = 0
  while (counter < HEIGHT) {

  }
}

/**
 * Moves the active piece left
 */
function moveLeft(state, payload) {
  var activePiece = state.get('activePiece')
  var board = state.get('existingBoard')

  var movedPiece = pieceHelpers.movePiece(activePiece, [-1, 0])
  if (boardHelpers.isValidPosition(movedPiece, board)) {
    return state.set('activePiece', movedPiece)
  }

  return state
}

/**
 * Moves the active piece left
 */
function moveRight(state, payload) {
  var activePiece = state.get('activePiece')
  var board = state.get('existingBoard')

  var movedPiece = pieceHelpers.movePiece(activePiece, [1, 0])
  if (boardHelpers.isValidPosition(movedPiece, board)) {
    return state.set('activePiece', movedPiece)
  }

  return state
}
