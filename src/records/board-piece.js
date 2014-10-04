var Tetriminos = require('../tetriminos')
var coord = require('../coord')
var Record = require('immutable').Record

var PieceStruct = Record({
  type: null,
  rotation: 0,
  pos: null,
})

class BoardPiece extends PieceStruct {
  /**
   * Returns the coords based on the rotation
   * position and type
   */
  getCoords() {
    var structure = Tetriminos[this.type].structure
    var rotation = this.rotation % structure.length

    return structure[rotation].map(offset => {
      return coord(
        offset.x + this.pos.x,
        offset.y + this.pos.y
      )
    })
  }
}

module.exports = BoardPiece
