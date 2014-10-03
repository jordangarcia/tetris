var Nuclear = require('nuclear-js')
var Immutable = require('immutable')
var Const = require('./constants')
var Tetriminos = require('../tetriminos')
var coord = require('../coord')
var BoardPiece = require('../board-piece')
var getPieceCoords = require('../helpers').getPieceCoords

var WIDTH = 10
var HEIGHT = 22

/**
 * The core that tracks the state of the board
 */
module.exports = Nuclear.createCore({
  initialize() {
    this.on(Const.SPAWN_PIECE, addPiece)

    this.computed('board', ['activePiece', 'inactivePieces'], calculateBoard)
    // initial state
    return {
      activePiece: null,
      inactivePieces: []
    }
  }
})

/**
 * @param {Immutable.Vector}
 */
function calculateBoard(activePiece, inactivePieces) {
  return generateBlankBoard(WIDTH, HEIGHT).withMutations(board => {
    if (activePiece) {
      getPieceCoords(activePiece).forEach(coord => {
        board.set(coord, activePiece.piece)
      })
    }

    inactivePieces.forEach(entry => {
      getPieceCoords(entry).forEach(coord => {
        board.set(coord, entry.piece)
      })
    })
    return board
  })
}

/**
 * Game tick, move piece down
 */
function tick(state, payload) {

}

/**
 * Spawns a piece and adds to board
 */
function addPiece(state, payload) {
  var piece = payload.piece
  var boardPiece = new BoardPiece({
    piece: piece,
    coord: coord(Tetriminos[piece].spawnPosition),
  })

  return state.set('activePiece', boardPiece)
}


/**
 * Generates an Immutable Map with [x, y] coords as keys
 */
function generateBlankBoard(width, height) {
  var map = []
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      map.push([coord(x, y), null])
    }
  }

  return Immutable.Map(map)
}
