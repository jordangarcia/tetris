var Tetriminos = require('../tetriminos')
var BoardPiece = require('../records/board-piece')
var Map = require('immutable').Map
var coord = require('../coord')
var isArray = require('lodash').isArray
var partial = require('lodash').partial


/**
 * Returns a new BoardPiece that has been moved down one
 * Returns the position of a board piece if moved down one
 * @param {BoardPiece} piece
 */
exports.moveDown = function(piece) {
  return new BoardPiece({
    type: piece.type,
    coord: addCoords(piece.coord, [0, -1])
  })
}

/**
 * @param {Array<Coord>} coords
 * @param {Immutable.Map} board
 * @return {Boolean}
 */
exports.isValidPosition = function(piece, board) {
  return exports.getPieceCoords(piece).every(pos => {
    return (pos.y >= 0 && board.get(pos) === null)
  })
}

/**
 * Gets the coordinates for a piece and adds to the returned board
 * @param {BoeadPiece} piece
 * @param {Immutable.Map} board
 */
exports.addPieceToBoard = function(piece, board) {
  return board.withMutations(board => {
    exports.getPieceCoords(piece).forEach(coord => {
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
 * Given a piece type and its bottom left position
 * returns an array of coords that the piece occupies
 * @param {BoardPiece}
 */
exports.getPieceCoords = function(boardPiece) {
  return Tetriminos[boardPiece.type].structure.map(x => {
    return addCoords(boardPiece.coord, x)
  })
}

function addCoords(c1, c2) {
  if (isArray(c1)) {
    c1 = coord(c1[0], c1[1])
  }
  if (isArray(c2)) {
    c2 = coord(c2[0], c2[1])
  }
  return coord(c1.x + c2.x, c1.y + c2.y)
}
