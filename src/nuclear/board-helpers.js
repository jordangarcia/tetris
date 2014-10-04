var Tetriminos = require('../tetriminos')
var Map = require('immutable').Map
var coord = require('../coord')

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
 * Check if there is a line at a given Y-level i
 */
exports.isLine = function(board, y, width) {
  return coordRange(y, width).every(x => {
    return board.get(x) !== null
  })
}

/**
 * Check if there is an empty row
 */
exports.isEmptyRow = function(board, y, width) {
  return coordRange(y, width).every(x => {
    return board.get(x) === null
  })
}

/**
 * Returns a new board state with a specific row nulled out
 */
exports.clearRow = function(board, y, width) {
  return board.withMutations(board => {
    coordRange(y, width).forEach(coord => {
      board.set(coord, null)
    })
  })
}

/**
 * Returns a new board state with a specific row nulled out
 */
exports.collapseRow = function(board, y, width, height) {
  var vertRange = []
  for (var i = y+1; i < height; i++) {
    vertRange.push(i)
  }

  return board.withMutations(board => {
    vertRange.forEach(y => {
      coordRange(y, width).forEach(pos => {
        var existing = board.get(pos)
        var replacePos = coord({
          x: pos.x - 1,
          y: y,
        })
        board.set(replacePos, existing)
      })
    })
    return board
  })
}

/**
 * Clears all lines and returns a new board
 */
exports.clearLines = function(board, width, height) {
  var ind = 0
  var counter = 0

  while (counter < height) {

  }
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

