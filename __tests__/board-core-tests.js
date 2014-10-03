jest.autoMockOff()

var Nuclear = require('nuclear-js')
var boardCore = require('../src/nuclear/board-core')
var Const = require('../src/nuclear/constants')
var coord = require('../src/coord')

describe("board core", () => {
  var reactor

  beforeEach(() => {
    reactor = Nuclear.createReactor()
    reactor.attachCore('board', boardCore)
  })

  it('initialState', () => {
    var board = reactor.getImmutable('board.board')
    expect(board.get(coord(0, 0))).toBe(null)
    expect(board.get(coord(0, 21))).toBe(null)
  })

  describe("spawnPiece", () => {
    it('should spawn in the correct location', () => {
      reactor.cycle({
        type: Const.SPAWN_PIECE,
        payload: {
          piece: 'I'
        }
      })

      expect(reactor.getImmutable('board.board').get(coord(2,20))).toBe(null)
      expect(reactor.getImmutable('board.board').get(coord(3,20))).toBe('I')
      expect(reactor.getImmutable('board.board').get(coord(4,20))).toBe('I')
      expect(reactor.getImmutable('board.board').get(coord(5,20))).toBe('I')
      expect(reactor.getImmutable('board.board').get(coord(6,20))).toBe('I')
      expect(reactor.getImmutable('board.board').get(coord(7,20))).toBe(null)
    })
  })
})
