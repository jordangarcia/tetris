import expect from 'expect'
import { Immutable } from 'nuclear-js'
import { Piece } from './records'
import {
  createBoard,
  isValidPosition,
  addPieceToBoard,
  getLines,
  removeLines,
  softDropPiece,
  rotate,
  move,
} from './helpers'

let { is, List } = Immutable

describe('Game', () => {
  describe('helpers', () => {
    describe('#createBoard', () => {
      it('should generate a 2d list', () => {
        const col = List([null, null, null, null])
        const expected = List([
          col,
          col,
          col,
        ])

        const result = createBoard(3, 4)
        expect(is(result, expected)).toBe(true)
      })

      it('should generate a prepopulated board if existing argument is present', () => {
        const col = List([null, null, null, null])
        const expected = List([
          List(['I', null, null]),
          List([null, 'J', null]),
          List([null, null, 'L']),
        ])

        const result = createBoard(3, 3, [
          [[0, 0], 'I'],
          [[1, 1], 'J'],
          [[2, 2], 'L'],
        ])
        expect(is(result, expected)).toBe(true)
      })
    })

    describe('#isValidPosition', () => {
      it('should return true when piece fits in board', () => {
        const board = createBoard(10, 10)
        const piece = new Piece({
          type: 'I',
          rotation: 0,
          pos: [5, 9]
        })
        const result = isValidPosition(piece, board)
        expect(result).toBe(true)
      })

      it('should return false when piece doesnt fits in board', () => {
        const board = createBoard(10, 10)
        const piece = new Piece({
          type: 'I',
          rotation: 0,
          pos: [8, 9]
        })
        const result = isValidPosition(piece, board)
        expect(result).toBe(false)
      })

      it('should return false when piece is out of bounds', () => {
        const board = createBoard(10, 10)
        const piece = new Piece({
          type: 'I',
          rotation: 0,
          pos: [-1, 9]
        })
        const result = isValidPosition(piece, board)
        expect(result).toBe(false)
      })

      it('should return false when it hits another piece', () => {
        const board = createBoard(10, 10, [
          [[6, 9], 'L'],
        ])
        const piece = new Piece({
          type: 'I',
          rotation: 0,
          pos: [5, 9]
        })
        const result = isValidPosition(piece, board)
        expect(result).toBe(false)
      })
    })

    describe('#addPieceToBoard', () => {
      it('should add the piece type to the board', () => {
        const expected = List([
          List([null, null, null, 'I']),
          List([null, null, null, 'I']),
          List([null, null, null, 'I']),
          List([null, null, null, 'I']),
        ])

        const piece = new Piece({
          type: 'I',
          rotation: 0,
          pos: [0, 3]
        })

        const blankBoard = createBoard(4, 4)
        const result = addPieceToBoard(piece, blankBoard)
        expect(is(result, expected)).toBe(true)
      })
    })

    describe('#getLines', () => {
      it('should return an array of y values where lines exist', () => {
        const board = createBoard(4, 4, [
          [[0, 1], 'I'],
          [[1, 1], 'I'],
          [[2, 1], 'I'],
          [[3, 1], 'I'],
          [[0, 2], 'I'],
          [[0, 3], 'J'],
          [[1, 3], 'L'],
          [[2, 3], 'I'],
          [[3, 3], 'I'],
        ])
        const expected = [1, 3]
        const result = getLines(board)
        expect(result).toEqual(expected)
      })
    })

    describe('#removeLines', () => {
      it('should return a new board with lines removed', () => {
        const board = createBoard(4, 4, [
          [[0, 1], 'I'],
          [[1, 1], 'I'],
          [[2, 1], 'I'],
          [[3, 1], 'I'],
          [[0, 2], 'I'],
          [[0, 3], 'J'],
          [[1, 3], 'L'],
          [[2, 3], 'I'],
          [[3, 3], 'I'],
        ])
        const expected = createBoard(4, 4, [
          [[0, 1], 'I'],
        ])
        const result = removeLines(board, [1, 3])
        expect(is(result, expected)).toBe(true)
      })
    })

    describe('#softDropPiece', () => {
      it('should soft drop a piece to a valid position', () => {
        const board = createBoard(10, 10, [
          [[5, 0], 'I'],
        ])

        const piece = new Piece({
          type: 'I',
          rotation: 0,
          pos: [4, 9]
        })

        const expected = new Piece({
          type: 'I',
          rotation: 0,
          pos: [4, 1]
        })

        const result = softDropPiece(piece, board)
        expect(expected.toJS()).toEqual(result.toJS())
      })
    })

    describe('#rotate', () => {
      it('should return a new piece with a new rotational value', () => {
        const piece = new Piece({
          type: 'I',
          rotation: 0,
          pos: [0, 0],
        })

        const expected = new Piece({
          type: 'I',
          rotation: 1,
          pos: [0, 0]
        })

        const result = rotate(piece, 1)
        expect(result.toJS()).toEqual(expected.toJS())
      })

      it('should not go over the number of available rotations', () => {
        const piece = new Piece({
          type: 'I',
          rotation: 0,
          pos: [0, 0],
        })

        const expected = new Piece({
          type: 'I',
          rotation: 0,
          pos: [0, 0]
        })

        const result = rotate(piece, 2)
        expect(result.toJS()).toEqual(expected.toJS())
      })
    })

    describe('#move', () => {
      it('should return a new piece with a new rotational value', () => {
        const piece = new Piece({
          type: 'I',
          rotation: 0,
          pos: [5, 5],
        })

        const expected = new Piece({
          type: 'I',
          rotation: 0,
          pos: [4, 4]
        })

        const result = move(piece, [-1, -1])
        expect(result.toJS()).toEqual(expected.toJS())
      })
    })
  })
})
