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
    this.on(Const.SPAWN_PIECE, spawnPiece)
    this.on(Const.CLEAR_LINES, clearLines)
    this.on(Const.LEFT, moveLeft)
    this.on(Const.RIGHT, moveRight)
    this.on(Const.MOVE_DOWN, moveDown)
    this.on(Const.SOFT_DROP, softDrop)
    this.on(Const.ROTATE, rotate)
    this.on(Const.PAUSE, pause)
    this.on(Const.UNPAUSE, unpause)

    this.computed('board', ['activePiece', 'existingBoard'], calculateBoard)
    this.computed('score', ['clears'], calculateScore)
    this.computed('softDropCoords', ['activePiece', 'existingBoard'], calculateSoftDrop)

    // initial state
    return {
      clears: [],
      activePiece: null,
      // the piece that was locked to the board on the last tick
      recentPiece: null,
      isOver: false,
      isPaused: false,
      existingBoard: boardHelpers.generateBlankBoard(WIDTH, HEIGHT),
    }
  }
})

/**
 * Returns an array of coords for the active piece if it was
 * soft-dropped
 */
function calculateSoftDrop(activePiece, board) {
  if (!activePiece) {
    return []
  }
  return boardHelpers.softDropPiece(activePiece, board).getCoords()
}

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
 * Returns a new board with the active piece on it
 *
 * This is the computed state of the actual state of the board
 * is at any given time
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
  if (!piece) {
    return state
  }

  var existingBoard = state.get('existingBoard')
  // move piece down and check if is valid
  var newPiece = pieceHelpers.move(piece, [0, -1])
  if (boardHelpers.isValidPosition(newPiece, existingBoard)) {
    newState = state.set('activePiece', newPiece)
  } else {
    // cannot move down, lock piece on board
    newState = state
      .set('existingBoard', boardHelpers.addPieceToBoard(piece, existingBoard))
      .set('recentPiece', piece)
      .set('activePiece', null)
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
  var existingBoard = state.get('existingBoard')

  var newPiece = pieceHelpers.move(piece, [0, -1])
  if (!boardHelpers.isValidPosition(newPiece, existingBoard)) {
    // if the piece is at the bottom of the board simulate a moveDown
    return moveDown(state)
  }

  newPiece = boardHelpers.softDropPiece(piece, existingBoard)
  return state.set('activePiece', newPiece)
}

/**
 * Spawns a piece and adds to board
 */
function spawnPiece(state, payload) {
  var piece = payload.piece
  var existingBoard = state.get('existingBoard')
  var spawnedPiece = new BoardPiece({
    type: piece,
    rotation: 0,
    pos: Tetriminos[piece].spawnPosition,
  })

  if (!boardHelpers.isValidPosition(spawnedPiece, existingBoard)) {
    // if the spawned piece is invalid the game is over
    return state
      .set('activePiece', spawnedPiece)
      .set('isOver', true)
  }

  return state.set('activePiece', spawnedPiece)
}

/**
 * Clears all existing lines
 */
function clearLines(state) {
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
 * Tries to move a piece some vector [deltaX, deltaY]
 * if the new position is valid, returns updated state
 */
function move(state, vector) {
  var activePiece = state.get('activePiece')
  var board = state.get('existingBoard')

  var movedPiece = pieceHelpers.move(activePiece, vector)
  if (boardHelpers.isValidPosition(movedPiece, board)) {
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
  var board = state.get('existingBoard')
  var piece = state.get('activePiece')

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

  // when rotating pieces against walls or other pieces, a translation may
  // be necessary to "bounce off the walls".  Iterate through the translations
  // until a valid position is found
  for (var i = 0; i < translations.length; i++) {
    rotatedPiece = pieceHelpers.move(rotatedPiece, translations[i])
    if (boardHelpers.isValidPosition(rotatedPiece, board)) {
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
