var Nuclear = require('nuclear-js')
var Immutable = require('immutable')
var Const = require('./constants')
var Tetriminos = require('../tetriminos')
var coord = require('../coord')
var BoardPiece = require('../records/board-piece')
var boardHelpers = require('./board-helpers')

var WIDTH = 10
var HEIGHT = 22

/**
 * The core that tracks the state of the board
 */
module.exports = Nuclear.createCore({
  initialize() {
    this.on(Const.SPAWN_PIECE, addPiece)
    this.on(Const.CLEAR_LINES, clearLines)

    this.computed('board', ['activePiece', 'existingBoard'], calculateBoard)
    // initial state
    return {
      activePiece: null,
      existingBoard: boardHelpers.generateBlankBoard(WIDTH, HEIGHT),
    }
  }
})

/**
 * @param {Immutable.Vector}
 */
function calculateBoard(activePiece, board) {
  if (activePiece) {
    return boardHelpers.addPiece(activePiece, board)
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
    var newPiece = boardHelpers.moveDown(piece)
    if (boardHelpers.isValidPosition(newPiece, board)) {
      newState = state.set('activePiece', newPiece)
    } else {
      newState = state
        .set('existingBoard', boardHelpers.addPieceToBoard(piece, existingBoard))
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
    coord: coord(Tetriminos[piece].spawnPosition),
  })

  return state.set('activePiece', boardPiece)
}

function clearLines(state, payload) {
}
