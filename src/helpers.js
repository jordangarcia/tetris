var Tetriminos = require('./tetriminos')
var coord = require('./coord')
var isArray = require('lodash').isArray

/**
 * Given a piece type and its bottom left position
 * returns an array of coords that the piece occupies
 * @param {BoardPiece}
 */
exports.getPieceCoords = function(boardPiece) {
  return Tetriminos[boardPiece.piece].structure.map(x => {
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
