jest.autoMockOff()

var BoardPiece = require('../src/records/board-piece')
var coord = require('../src/coord')
var Immutable = require('immutable')

describe("BoardPiece Record", () => {
  describe("#getCoords", () => {
    it("no rotation", () => {
      var piece = new BoardPiece({
        type: 'I',
        rotation: 0,
        pos: coord(0,0)
      })

      var result = piece.getCoords()
      expect(result).toEqual([
        coord(0,0),
        coord(1,0),
        coord(2,0),
        coord(3,0),
      ])
    })

    it("rotation = 1", () => {
      var piece = new BoardPiece({
        type: 'I',
        rotation: 1,
        pos: coord(0,0)
      })

      var result = piece.getCoords()
      expect(result).toEqual([
        coord(0,0),
        coord(0,1),
        coord(0,2),
        coord(0,3),
      ])
    })
  })
})
