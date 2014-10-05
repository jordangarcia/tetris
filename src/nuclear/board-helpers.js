var Tetriminos = require('../tetriminos')
var Map = require('immutable').Map
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
      debugger
      var y = yVal - numRemoved
      var vertRange = []
      for (var i = y+1; i < height; i++) {
        vertRange.push(i)
      }

      vertRange.forEach(y => {
        coordRange(y, width).forEach(pos => {
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
 * Returns an array of coord for a given Y-level
 */
function coordRange(y, width) {
  var coords = []
  for(var i = 0; i < width; i++) {
    coords.push(coord(i, y))
  }
  return coords
}

/**
 * Check if there is a line at a given Y-level i
 */
function isLine(board, y, width) {
  return coordRange(y, width).every(x => {
    return board.get(x) !== null
  })
}
