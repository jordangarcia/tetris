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
    this.on(Const.MOVE_DOWN, moveDown)
    this.on(Const.SOFT_DROP, softDrop)
    this.on(Const.ROTATE, rotate)

    this.computed('board', ['activePiece', 'existingBoard'], calculateBoard)
    this.computed('score', ['clears'], calculateScore)
    // initial state
    return {
      clears: [],
      activePiece: null,
      recentPiece: null,
      existingBoard: boardHelpers.generateBlankBoard(WIDTH, HEIGHT),
    }
  }
})

/**
 * Calculates the score based on the history of all cleared lines
 * @param {Immutable.Vector} clears
 * @return {Immutable.Map}
 */
function calculateScore(clears) {
  var score = {
    lines: 0,
    single: 0,
    double: 0,
    triple: 0,
    tetris: 0,
  }

  clears.forEach(num => {
    score.lines += num
    switch(num) {
      case 1:
        score.single++
        break
      case 2:
        score.double++
        break
      case 3:
        score.triple++
        break
      case 4:
        score.tetris++
        break
    }
  })

  return score
}

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
function moveDown(state) {
  var newState = state
  var piece = state.get('activePiece')
  var existingBoard = state.get('existingBoard')
  if (piece) {
    // move piece down and check if is valid
    var newPiece = pieceHelpers.move(piece, [0, -1])
    if (boardHelpers.isValidPosition(newPiece, existingBoard)) {
      newState = state
        .set('activePiece', newPiece)
    } else {
      newState = state
        .set('existingBoard', boardHelpers.addPieceToBoard(piece, existingBoard))
        .set('recentPiece', piece)
        .set('activePiece', null)
    }
  }
  return newState
}

function softDrop(state) {
  var piece = state.get('activePiece')
  var existingBoard = state.get('existingBoard')

  if (piece) {
    var deltaY = -1
    var newPiece = pieceHelpers.move(piece, [0, deltaY])
    if (!boardHelpers.isValidPosition(newPiece, existingBoard)) {
      // if the piece is at the bottom of the board simulate a moveDown
      return moveDown(state)
    }

    // move the piece down until its no longer valid
    while (boardHelpers.isValidPosition(newPiece, existingBoard)) {
      deltaY--
      newPiece = pieceHelpers.move(piece, [0, deltaY])
    }

    // move one above the invalid position
    newPiece = pieceHelpers.move(piece, [0, deltaY + 1])
    return state.set('activePiece', newPiece)
  }

  return state
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
function clearLines(state) {
  debugger
  var board = state.get('existingBoard')
  var recentPiece = state.get('recentPiece')
  if (!recentPiece) {
    return state
  }

  var lines = boardHelpers.getLines(board, WIDTH, HEIGHT)
  if (lines.length === 0) {
    return state
  }

  // add the number of lines to the record of clears
  return state
    .update('clears', vect => vect.push(lines.length))
    .set('existingBoard', boardHelpers.removeLines(board, lines, WIDTH, HEIGHT))
}

/**
 * Moves the active piece left
 */
function moveLeft(state, payload) {
  var newState = state
  var activePiece = state.get('activePiece')
  var board = state.get('existingBoard')

  if (activePiece) {
    var movedPiece = pieceHelpers.move(activePiece, [-1, 0])
    if (boardHelpers.isValidPosition(movedPiece, board)) {
      newState = state.set('activePiece', movedPiece)
    }
  }

  return newState
}

/**
 * Moves the active piece left
 */
function moveRight(state, payload) {
  var newState = state
  var activePiece = state.get('activePiece')
  var board = state.get('existingBoard')

  if (activePiece) {
    var movedPiece = pieceHelpers.move(activePiece, [1, 0])
    if (boardHelpers.isValidPosition(movedPiece, board)) {
      newState = state.set('activePiece', movedPiece)
    }
  }

  return newState
}

/**
 * Rotates a piece an arbitrary number of times
 */
function rotate(state, payload) {
  var board = state.get('existingBoard')
  var piece = state.get('activePiece')
  if (!piece) {
    return state
  }

  var rotatedPiece = pieceHelpers.rotate(piece, payload.diff)
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

  for (var i = 0; i < translations.length; i++) {
    rotatedPiece = pieceHelpers.move(rotatedPiece, translations[i])
    if (boardHelpers.isValidPosition(rotatedPiece, board)) {
      return state.set('activePiece', rotatedPiece)
    }
  }

  return state
}
