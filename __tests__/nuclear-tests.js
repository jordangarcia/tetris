jest.autoMockOff()

var Immutable = require('immutable')
var Nuclear = require('nuclear-js')
var boardCore = require('../src/nuclear/board-core')
var gameActions = require('../src/nuclear/game-actions')
var Const = require('../src/nuclear/constants')
var BoardPiece = require('../src/records/board-piece')
var coord = require('../src/coord')

describe("board core", () => {
  var reactor

  beforeEach(() => {
    reactor = Nuclear.createReactor()
    reactor.attachCore('board', boardCore)
    reactor.bindActions('game', gameActions)
  })

  describe("tick", () => {
    describe("when the piece can fall", () => {
      beforeEach(() => {
        var piece = new BoardPiece({
          type: 'I',
          coord: coord(0, 1)
        })
        reactor.state = reactor.state
          .updateIn(['board', 'activePiece'], x => piece)
      })

      it('should drop the piece', () => {
        reactor.action('game').tick()

        var board = reactor.getImmutable('board.board')
        var activeCoord = reactor.getImmutable('board.activePiece').get('coord')
        expect(Immutable.is(activeCoord, coord(0, 0))).toBe(true)

        expect(board.get(coord(0, 0))).toBe('I')
        expect(board.get(coord(1, 0))).toBe('I')
        expect(board.get(coord(2, 0))).toBe('I')
        expect(board.get(coord(3, 0))).toBe('I')
        expect(board.get(coord(4, 0))).toBe(null)
        expect(board.get(coord(0, 1))).toBe(null)
      })
    })

    describe("when the piece is at the bottom", () => {
      beforeEach(() => {
        var piece = new BoardPiece({
          type: 'I',
          coord: coord(0, 0)
        })
        reactor.state = reactor.state
          .updateIn(['board', 'activePiece'], x => piece)
      })

      it('should drop the piece', () => {
        reactor.action('game').tick()

        var board = reactor.getImmutable('board.board')
        var activePiece = reactor.getImmutable('board.activePiece')
        expect(activePiece).toBe(null)

        expect(board.get(coord(0, 0))).toBe('I')
        expect(board.get(coord(1, 0))).toBe('I')
        expect(board.get(coord(2, 0))).toBe('I')
        expect(board.get(coord(3, 0))).toBe('I')
        expect(board.get(coord(4, 0))).toBe(null)
        expect(board.get(coord(0, 1))).toBe(null)
      })
    })
  })

  describe("moving left", () => {
    describe("when there is room", () => {
      beforeEach(() => {
        var piece = new BoardPiece({
          type: 'I',
          coord: coord(1, 1)
        })
        reactor.state = reactor.state
          .updateIn(['board', 'activePiece'], x => piece)
      })

      it('should move left', () => {
        reactor.action('game').moveLeft()

        var board = reactor.getImmutable('board.board')
        var activeCoord = reactor.getImmutable('board.activePiece').get('coord')
        expect(Immutable.is(activeCoord, coord(0, 1))).toBe(true)

        expect(board.get(coord(0, 1))).toBe('I')
        expect(board.get(coord(1, 1))).toBe('I')
        expect(board.get(coord(2, 1))).toBe('I')
        expect(board.get(coord(3, 1))).toBe('I')
        expect(board.get(coord(4, 1))).toBe(null)
        expect(board.get(coord(0, 0))).toBe(null)

      })
    })
  })
})
