var Tetriminos = require('../tetriminos')
var Map = require('nuclear-js').Immutable.Map
var pieceHelper = require('./piece-helper')
var coord = require('../coord')
var range = require('lodash').range

/**
 * @param {Array<Coord>} coords
 * @param {Immutable.Map} board
 * @return {Boolean}
 */
exports.isValidPosition = function(piece, board) {
  return piece.getCoords().every(pos => {
    return board.get(pos) === null
  })
}

/**
 * Gets the coordinates for a piece and adds to the returned board
 * @param {BoeadPiece} piece
 * @param {Immutable.Map} board
 */
exports.addPieceToBoard = function(piece, board) {
  return board.withMutations(board => {
    piece.getCoords().forEach(coord => {
      board.set(coord, piece.type)
    })
  })
}

/**
 * Generates an Immutable Map with [x, y] coords as keys
 */
exports.generateBlankBoard = function(width, height) {
  var map = []
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      map.push([coord(x, y), null])
    }
  }

  return Map(map)
}

/**
 * Returns an array of all Y values that are lines
 */
exports.getLines = function(board, width, height) {
  return range(height).filter(y => isLine(board, y, width))
}

/**
 * Returns a new board state with a specific row nulled out
 */
exports.removeLines = function(board, toRemove, width, height) {
  var numRemoved = 0

  return board.withMutations(board => {
    toRemove.forEach(yVal => {
      var y = yVal - numRemoved
      var vertRange = []
      for (var i = y+1; i < height; i++) {
        vertRange.push(i)
      }

      vertRange.forEach(y => {
        range(width).forEach(x => {
          var pos = coord(x, y)
          var existing = board.get(pos)
          var replacePos = coord(
            pos.x,
            pos.y - 1
          )
          board.set(replacePos, existing)
        })
      })

      numRemoved++
    })

    return board
  })
}

/**
 * Returns a BoardPiece with the location of the piece after a soft
 * drop
 */
exports.softDropPiece = function(piece, board) {
  var newPiece = piece
  var deltaY = 0
  // move the piece down until its no longer valid
  while (exports.isValidPosition(newPiece, board)) {
    deltaY--
    newPiece = pieceHelper.move(piece, [0, deltaY])
  }

  // move one above the invalid position
  return pieceHelper.move(piece, [0, deltaY + 1])
}

/**
 * Check if there is a line at a given Y-level i
 */
function isLine(board, y, width) {
  return range(width).every(x => {
    return board.get(coord(x, y)) !== null;
  })
}
