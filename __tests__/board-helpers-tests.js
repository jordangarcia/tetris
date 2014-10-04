jest.autoMockOff()

var boardHelpers = require('../src/nuclear/board-helpers')
var pieceHelpers = require('../src/nuclear/piece-helpers')
var BoardPiece = require('../src/records/board-piece')
var coord = require('../src/coord')

describe('board-helpers', () => {
  describe('can move down', () => {
    var board
    beforeEach(() => {
      board = boardHelpers.generateBlankBoard(10, 22).set(coord(0, 0), 'I')
    })

    it('should return false when blocked by another piece', () => {
      var piece = new BoardPiece({
        type: 'I',
        pos: coord(0, 1)
      })

      var result = boardHelpers.isValidPosition(pieceHelpers.move(piece, [0, -1]), board)
      expect(result).toBe(false)
    })

    it('should return false when at the bottom', () => {
      var piece = new BoardPiece({
        type: 'I',
        pos: coord(0, 0)
      })
      var board = boardHelpers.generateBlankBoard(10, 22)
      var result = boardHelpers.isValidPosition(pieceHelpers.move(piece, [0, -1]), board)
      expect(result).toBe(false)
    })
  })

  describe('#addPieceToBoard', () => {
    it('should add piece', () => {
      var piece = new BoardPiece({
        type: 'I',
        pos: coord(0, 0)
      })
      var board = boardHelpers.generateBlankBoard(10, 22)

      var newBoard = boardHelpers.addPieceToBoard(piece, board)
      expect(newBoard.get(coord(0,0))).toBe('I')
      expect(newBoard.get(coord(1,0))).toBe('I')
      expect(newBoard.get(coord(2,0))).toBe('I')
      expect(newBoard.get(coord(3,0))).toBe('I')
      expect(newBoard.get(coord(4,0))).toBe(null)
    })
  })

  describe('#isLine', () => {
    it("should return false if there is no line", () => {
      var board = boardHelpers.generateBlankBoard(10, 22)
        .set(coord(0, 0), 'I')
        .set(coord(1, 0), 'I')
        .set(coord(2, 0), 'I')
        .set(coord(3, 0), 'I')
        .set(coord(5, 0), 'I')
        .set(coord(6, 0), 'I')
        .set(coord(7, 0), 'I')
        .set(coord(8, 0), 'I')
        .set(coord(9, 0), 'I')
      var width = 10

      expect(boardHelpers.isLine(board, 0, width)).toBe(false)
    })

    it("should return true if there is a line", () => {
      var board = boardHelpers.generateBlankBoard(10, 22)
        .set(coord(0, 0), 'I')
        .set(coord(1, 0), 'I')
        .set(coord(2, 0), 'I')
        .set(coord(3, 0), 'I')
        .set(coord(4, 0), 'I')
        .set(coord(5, 0), 'I')
        .set(coord(6, 0), 'I')
        .set(coord(7, 0), 'J')
        .set(coord(8, 0), 'I')
        .set(coord(9, 0), 'I')

      var width = 10

      expect(boardHelpers.isLine(board, 0, width)).toBe(true)
    })
  })
})
