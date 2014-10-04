jest.autoMockOff()

var Nuclear = require('nuclear-js')
var gameCore = require('../src/nuclear/game-core')
var Const = require('../src/nuclear/constants')
var coord = require('../src/coord')

describe("game core", () => {
  var reactor

  beforeEach(() => {
    reactor = Nuclear.createReactor()
    reactor.attachCore('game', gameCore)
  })

  it('initialState', () => {
    var board = reactor.getImmutable('game.board')
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

      expect(reactor.getImmutable('game.board').get(coord(2,20))).toBe(null)
      expect(reactor.getImmutable('game.board').get(coord(3,20))).toBe('I')
      expect(reactor.getImmutable('game.board').get(coord(4,20))).toBe('I')
      expect(reactor.getImmutable('game.board').get(coord(5,20))).toBe('I')
      expect(reactor.getImmutable('game.board').get(coord(6,20))).toBe('I')
      expect(reactor.getImmutable('game.board').get(coord(7,20))).toBe(null)
    })
  })
})
