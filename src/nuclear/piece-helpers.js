var BoardPiece = require('../records/board-piece')
var Tetriminos = require('../tetriminos')
var coord = require('../coord')
var isArray = require('lodash').isArray

/**
 * Takes an inputted BoardPiece and rotates it some number of turns
 * can be rotated counter clockwise by passing a negative diff
 * @param {BoardPiece} piece
 * @param {number} diff
 * @return {BoardPiece}
 */
exports.rotate = function(piece, diff) {
  var rotationLen = Tetriminos[piece.type].structure.length
  var newRotation = (piece.rotation + diff) % rotationLen

  return new BoardPiece({
    type: piece.type,
    rotation: newRotation,
    pos: piece.pos,
  })
}

/**
 * Returns a new BoardPiece that has been moved down one
 * Returns the position of a board piece if moved down one
 * @param {BoardPiece} piece
 */
exports.move = function(piece, vector) {
  return new BoardPiece({
    type: piece.type,
    rotation: piece.rotation,
    pos: addCoords(piece.pos, vector),
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
