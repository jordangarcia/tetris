jest.autoMockOff()

var helpers = require('../src/nuclear/board-helpers')
var BoardPiece = require('../src/records/board-piece')
var coord = require('../src/coord')

describe('board-helpers', () => {
  describe('can move down', () => {
    var board
    beforeEach(() => {
      board = helpers.generateBlankBoard(10, 22).set(coord(0, 0), 'I')
    })

    it('should return false when blocked by another piece', () => {
      var piece = new BoardPiece({
        type: 'I',
        coord: coord(0, 1)
      })

      var result = helpers.isValidPosition(helpers.moveDown(piece), board)
      expect(result).toBe(false)
    })

    it('should return false when at the bottom', () => {
      var piece = new BoardPiece({
        type: 'I',
        coord: coord(0, 0)
      })
      var board = helpers.generateBlankBoard(10, 22)
      var result = helpers.isValidPosition(helpers.moveDown(piece), board)
      expect(result).toBe(false)
    })
  })

  describe('#addPieceToBoard', () => {
    var piece = new BoardPiece({
      type: 'I',
      coord: coord(0, 0)
    })
    var board = helpers.generateBlankBoard(10, 22)

    var newBoard = helpers.addPieceToBoard(piece, board)
    expect(newBoard.get(coord(0,0))).toBe('I')
    expect(newBoard.get(coord(1,0))).toBe('I')
    expect(newBoard.get(coord(2,0))).toBe('I')
    expect(newBoard.get(coord(3,0))).toBe('I')
    expect(newBoard.get(coord(4,0))).toBe(null)
  })
})
